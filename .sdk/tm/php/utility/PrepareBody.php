<?php
declare(strict_types=1);

// MunicipalFinance SDK utility: prepare_body

class MunicipalFinancePrepareBody
{
    public static function call(MunicipalFinanceContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
