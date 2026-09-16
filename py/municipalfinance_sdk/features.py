# MunicipalFinance SDK feature factory

from municipalfinance_sdk.feature.base_feature import MunicipalFinanceBaseFeature
from municipalfinance_sdk.feature.ratelimit_feature import MunicipalFinanceRatelimitFeature
from municipalfinance_sdk.feature.retry_feature import MunicipalFinanceRetryFeature
from municipalfinance_sdk.feature.test_feature import MunicipalFinanceTestFeature
from municipalfinance_sdk.feature.timeout_feature import MunicipalFinanceTimeoutFeature


_FEATURES = {
    "base": lambda: MunicipalFinanceBaseFeature(),
    "ratelimit": lambda: MunicipalFinanceRatelimitFeature(),
    "retry": lambda: MunicipalFinanceRetryFeature(),
    "test": lambda: MunicipalFinanceTestFeature(),
    "timeout": lambda: MunicipalFinanceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
