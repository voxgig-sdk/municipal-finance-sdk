<?php
declare(strict_types=1);

// MunicipalFinance SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MunicipalFinanceMakeContext
{
    public static function call(array $ctxmap, ?MunicipalFinanceContext $basectx): MunicipalFinanceContext
    {
        return new MunicipalFinanceContext($ctxmap, $basectx);
    }
}
