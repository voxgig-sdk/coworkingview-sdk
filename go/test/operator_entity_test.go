package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/coworkingview-sdk/go"
	"github.com/voxgig-sdk/coworkingview-sdk/go/core"

	vs "github.com/voxgig-sdk/coworkingview-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const operatorEntityLiveStrict = true


func TestOperatorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Operator(nil)
		if ent == nil {
			t.Fatal("expected non-nil OperatorEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Operator(nil).Load(map[string]any{"id": 1, "locale": "x"}, nil)
		if sdkerr, ok := err.(*core.CoworkingviewError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := operatorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "operator." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"operator01": "hq"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, operatorEntityLiveStrict, setup.data, "operator", "slug", setup.idmap["operator01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["operator01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		operatorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.operator")))
		var operatorRef01Data map[string]any
		if len(operatorRef01DataRaw) > 0 {
			operatorRef01Data = core.ToMapAny(operatorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = operatorRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		operatorRef01Ent := client.Operator(nil)
		operatorRef01MatchDt0 := map[string]any{
			"id": operatorRef01Data["slug"],
		}
		if setup.live {
			operatorRef01MatchDt0["locale"] = "en"
		}
		operatorRef01DataDt0Loaded, err := operatorRef01Ent.Load(operatorRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		operatorRef01DataDt0LoadResult := core.ToMapAny(entityData(operatorRef01DataDt0Loaded))
		if operatorRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(operatorRef01DataDt0LoadResult["slug"], operatorRef01Data["slug"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func operatorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "operator", "OperatorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read operator test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse operator test data: " + err.Error())
	}

	for _, rec := range core.ToMapAny(vs.GetPath(entityData, "existing.operator")) {
		if recMap := core.ToMapAny(rec); recMap != nil && recMap["id"] != nil {
			recMap["slug"] = recMap["id"]
		}
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"operator01", "operator02", "operator03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COWORKINGVIEW_TEST_OPERATOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COWORKINGVIEW_TEST_OPERATOR_ENTID": idmap,
		"COWORKINGVIEW_TEST_LIVE":      "FALSE",
		"COWORKINGVIEW_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["COWORKINGVIEW_TEST_OPERATOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["COWORKINGVIEW_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewCoworkingviewSDK(core.ToMapAny(mergedOpts))
	}

	live := env["COWORKINGVIEW_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["COWORKINGVIEW_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
