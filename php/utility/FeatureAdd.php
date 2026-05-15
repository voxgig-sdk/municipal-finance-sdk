<?php
declare(strict_types=1);

// MunicipalFinance SDK utility: feature_add

class MunicipalFinanceFeatureAdd
{
    public static function call(MunicipalFinanceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
