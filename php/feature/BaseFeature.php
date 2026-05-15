<?php
declare(strict_types=1);

// MunicipalFinance SDK base feature

class MunicipalFinanceBaseFeature
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

    public function init(MunicipalFinanceContext $ctx, array $options): void {}
    public function PostConstruct(MunicipalFinanceContext $ctx): void {}
    public function PostConstructEntity(MunicipalFinanceContext $ctx): void {}
    public function SetData(MunicipalFinanceContext $ctx): void {}
    public function GetData(MunicipalFinanceContext $ctx): void {}
    public function GetMatch(MunicipalFinanceContext $ctx): void {}
    public function SetMatch(MunicipalFinanceContext $ctx): void {}
    public function PrePoint(MunicipalFinanceContext $ctx): void {}
    public function PreSpec(MunicipalFinanceContext $ctx): void {}
    public function PreRequest(MunicipalFinanceContext $ctx): void {}
    public function PreResponse(MunicipalFinanceContext $ctx): void {}
    public function PreResult(MunicipalFinanceContext $ctx): void {}
    public function PreDone(MunicipalFinanceContext $ctx): void {}
    public function PreUnexpected(MunicipalFinanceContext $ctx): void {}
}
