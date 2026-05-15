<?php
declare(strict_types=1);

// MunicipalFinance SDK utility: result_body

class MunicipalFinanceResultBody
{
    public static function call(MunicipalFinanceContext $ctx): ?MunicipalFinanceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
