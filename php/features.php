<?php
declare(strict_types=1);

// MunicipalFinance SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MunicipalFinanceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MunicipalFinanceBaseFeature();
            case "test":
                return new MunicipalFinanceTestFeature();
            default:
                return new MunicipalFinanceBaseFeature();
        }
    }
}
