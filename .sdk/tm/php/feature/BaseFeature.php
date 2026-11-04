<?php
declare(strict_types=1);

// Coworkingview SDK base feature

class CoworkingviewBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CoworkingviewContext $ctx, array $options): void {}
    public function PostConstruct(CoworkingviewContext $ctx): void {}
    public function PostConstructEntity(CoworkingviewContext $ctx): void {}
    public function SetData(CoworkingviewContext $ctx): void {}
    public function GetData(CoworkingviewContext $ctx): void {}
    public function GetMatch(CoworkingviewContext $ctx): void {}
    public function SetMatch(CoworkingviewContext $ctx): void {}
    public function PrePoint(CoworkingviewContext $ctx): void {}
    public function PreSpec(CoworkingviewContext $ctx): void {}
    public function PreRequest(CoworkingviewContext $ctx): void {}
    public function PreResponse(CoworkingviewContext $ctx): void {}
    public function PreResult(CoworkingviewContext $ctx): void {}
    public function PreDone(CoworkingviewContext $ctx): void {}
    public function PreUnexpected(CoworkingviewContext $ctx): void {}
}
