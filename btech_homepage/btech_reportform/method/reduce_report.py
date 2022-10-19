def reduce_key(*args, **kwargs):
    k = kwargs['statement']
    data = kwargs['data']
    return True if data in k else False