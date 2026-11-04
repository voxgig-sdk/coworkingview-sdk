<?php
declare(strict_types=1);

// Property entity test

require_once __DIR__ . '/../coworkingview_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PropertyEntityTestFailHook extends CoworkingviewBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(CoworkingviewContext $ctx, array $options): void
    {
    }

    public function PreSpec(CoworkingviewContext $ctx): void
    {
        throw new \RuntimeException('property hook failed');
    }

    public function PreUnexpected(CoworkingviewContext $ctx): void
    {
        $this->unexpected++;
    }
}

class PropertyEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = CoworkingviewSDK::test(null, null);
        $ent = $testsdk->Property(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "property" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = CoworkingviewSDK::test($seed, null);
        $seen = iterator_to_array($base->Property(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = CoworkingviewConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = CoworkingviewSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Property(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(CoworkingviewSDK::test($offline, null)->Property(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(CoworkingviewSDK::test($offline, null)->Property(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = CoworkingviewConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = CoworkingviewSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->Property(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(CoworkingviewSDK::test(null, null)->Property(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new PropertyEntityTestFailHook();
        $client = new CoworkingviewSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->Property(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->Property(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = CoworkingviewConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new CoworkingviewSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('property transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->Property(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(CoworkingviewError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->Property(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = CoworkingviewConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = CoworkingviewSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Property(null)->list(["address" => 1, "locale" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = property_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "property." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            $_liveId = empty($setup["synthetic_only"]) ? ($setup["idmap"]["property01"] ?? null) : null;
            $_liveId = $_liveId ?? 'hq-kings-cross-london';
            Runner::live_pace();
            Runner::live_existing($setup, self::LIVE_STRICT, "property",
                fn() => $client->Property(null)->list(["locale" => 'en'], null), "slug", $_liveId);
        }

        // Bootstrap entity data from existing test data.
        $property_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.property")));
        $property_ref01_data = null;
        if (count($property_ref01_data_raw) > 0) {
            $property_ref01_data = Helpers::to_map($property_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $property_ref01_ent = $client->Property(null);
        $property_ref01_match = [];
        if (!empty($setup["live"])) {
            $property_ref01_match["locale"] = 'en';
        }

        $property_ref01_list_result = $property_ref01_ent->list($property_ref01_match, null);
        $this->assertIsArray($property_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $property_ref01_match_dt0 = [
            "id" => $property_ref01_data["slug"],
        ];
        if (!empty($setup["live"])) {
            $property_ref01_match_dt0["locale"] = 'en';
        }
        $property_ref01_data_dt0_loaded = $property_ref01_ent->load($property_ref01_match_dt0, null);
        $property_ref01_data_dt0_load_result = Helpers::to_map(is_object($property_ref01_data_dt0_loaded) && method_exists($property_ref01_data_dt0_loaded, 'data_get') ? $property_ref01_data_dt0_loaded->data_get() : $property_ref01_data_dt0_loaded);
        $this->assertNotNull($property_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($property_ref01_data_dt0_load_result["slug"] ?? null, $property_ref01_data["slug"]));

    }
}

function property_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/property/PropertyTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    foreach (($entity_data["existing"]["property"] ?? []) as $rec_key => $rec) {
        if (is_array($rec) && isset($rec["id"])) {
            $entity_data["existing"]["property"][$rec_key]["slug"] = $rec["id"];
        }
    }

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CoworkingviewSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["property01", "property02", "property03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COWORKINGVIEW_TEST_PROPERTY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COWORKINGVIEW_TEST_PROPERTY_ENTID" => $idmap,
        "COWORKINGVIEW_TEST_LIVE" => "FALSE",
        "COWORKINGVIEW_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COWORKINGVIEW_TEST_PROPERTY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["COWORKINGVIEW_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new CoworkingviewSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["COWORKINGVIEW_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["COWORKINGVIEW_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
