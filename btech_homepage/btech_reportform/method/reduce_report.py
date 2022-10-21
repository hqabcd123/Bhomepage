class Statement():
    statement_list = [
        'regulator',
        'suray',
        'pump',
        'check',
        'img',
        'command',
    ]
    
    StatementSort = {}
    RowSort = {}
    
    def __init__(self, data) -> None:
        temp_dict = {}
        print(' img: {} '.format(data.getlist('img[]')))
        for temp in self.statement_list:
            temp_dict[temp] = []
        for k in data:
            '''
            data = {statement[0]['regulator'], statement[1]['regulator'], ..., command[0], img[0]}
            then split to {staement, command, img}
            
            '''
            print(k)
            statement_key = self.__reduce_key(statement = self.statement_list, data = k)
            print(' value: {} and key is {} '.format(data[k], statement_key))
            temp_dict[statement_key].append(data.getlist(k))
        self.StatementSort = temp_dict
        print(self.StatementSort)
        self.__sort_by_row()
        
    def __sort_by_row(self):
        lenght = len(self.StatementSort[self.statement_list[0]])
        reg_list = [[] for i in range(lenght)]
        print('****'*20)
        print(reg_list)
        for k, v in self.StatementSort.items():
            for i in range(len(v)):
                reg_list[i].append(v[i][0])
        print(reg_list)
        pass
    
    def __reduce_key(*args, **kwargs) -> str:
        k = kwargs['statement']
        data = kwargs['data']
        result = ''
        for key in k:
            if key in data:
                result = key
                return result
        return None