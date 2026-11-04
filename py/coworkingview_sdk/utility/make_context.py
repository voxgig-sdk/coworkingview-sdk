# Coworkingview SDK utility: make_context

from coworkingview_sdk.core.context import CoworkingviewContext


def make_context_util(ctxmap, basectx):
    return CoworkingviewContext(ctxmap, basectx)
