<?php
declare(strict_types=1);

// NewsPublic SDK base feature

class NewsPublicBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NewsPublicContext $ctx, array $options): void {}
    public function PostConstruct(NewsPublicContext $ctx): void {}
    public function PostConstructEntity(NewsPublicContext $ctx): void {}
    public function SetData(NewsPublicContext $ctx): void {}
    public function GetData(NewsPublicContext $ctx): void {}
    public function GetMatch(NewsPublicContext $ctx): void {}
    public function SetMatch(NewsPublicContext $ctx): void {}
    public function PrePoint(NewsPublicContext $ctx): void {}
    public function PreSpec(NewsPublicContext $ctx): void {}
    public function PreRequest(NewsPublicContext $ctx): void {}
    public function PreResponse(NewsPublicContext $ctx): void {}
    public function PreResult(NewsPublicContext $ctx): void {}
    public function PreDone(NewsPublicContext $ctx): void {}
    public function PreUnexpected(NewsPublicContext $ctx): void {}
}
