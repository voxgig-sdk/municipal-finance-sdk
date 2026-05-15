# MunicipalFinance SDK utility: make_context

from core.context import MunicipalFinanceContext


def make_context_util(ctxmap, basectx):
    return MunicipalFinanceContext(ctxmap, basectx)
