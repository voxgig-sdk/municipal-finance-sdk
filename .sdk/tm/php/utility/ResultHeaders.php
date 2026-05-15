<?php
declare(strict_types=1);

// MunicipalFinance SDK utility: result_headers

class MunicipalFinanceResultHeaders
{
    public static function call(MunicipalFinanceContext $ctx): ?MunicipalFinanceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
