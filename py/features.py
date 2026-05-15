# MunicipalFinance SDK feature factory

from feature.base_feature import MunicipalFinanceBaseFeature
from feature.test_feature import MunicipalFinanceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MunicipalFinanceBaseFeature(),
        "test": lambda: MunicipalFinanceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
