# MunicipalFinance SDK exists test

import pytest
from municipalfinance_sdk import MunicipalFinanceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MunicipalFinanceSDK.test(None, None)
        assert testsdk is not None
