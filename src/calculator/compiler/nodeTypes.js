const nodeTypes = {
    BINARY_OPERATOR: 'BINARY_OPERATOR',
    NUMBER: 'NUMBER',
    UNARY_OPERATOR: 'UNARY_OPERATOR'
}



export default nodeTypes;

// Type of expression:
/*
    [
        {
            type: 'EXPRESSION',
            value: [
                {
                    type: 'BINARY_OPERATION',
                    operator: '+',
                    left: { type: 'NUMBER', value: 5 },
                    right: { type: 'NUMBER', value: 3 }
                }
            ]
        }
    ]   

    = 5+3
= [
    5,
    +,
    3
]
    = 8

    [
        {
            type: 'BRACKETS_EXPRESSION',
            value: [
                {
                    type: 'BINARY_OPERATION',
                    operator: '*',
                    left: { type: 'NUMBER', value: 2 },
                    right: { type: 'NUMBER', value: 4 }
                }
            ]
        },   
        {
            type: 'NUMBER',
            value: 2
        }
    ]

*/