def reduce_Post_to_Json(data):
    '''
    reduce {statement[0]['regular'], statement[1]['regular'], ..., command[0], img[0]}
    to
    [{'regular':x, ...}, {'regular':x, ...}]
    '''
    klist = [
        'statement',
        'img',
        'command',
    ]
    statement_list = [
        'regular',
        'suray',
        'pump',
        'check',
    ]
    temp_dict = {}
    for temp in statement_list:
        temp_dict[temp] = []
    for k, v in data.items():
        '''
        data = {statement[0]['regular'], statement[1]['regular'], ..., command[0], img[0]}
        then split to {staement, command, img}
        
        '''
        print(k)
        statement = reduce_key(statement = klist, data = k) #filter
        statement_key = reduce_key(statement = statement_list, data = k)
        print(' value: {} and key is {} '.format(statement, statement_key))
        temp_dict[statement_key].append(v)
    print(temp_dict)


def reduce_key(*args, **kwargs) -> str:
    k = kwargs['statement']
    data = kwargs['data']
    result = ''
    for key in k:
        if key in data:
            result = key
            return result
    return None