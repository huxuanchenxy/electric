export default {
    labelWidth: "120px",
    formItems: [{
        type: 'input',
        label: "用户名",
        placeholder: '请输入用户名',
        field: 'name'
    },
    {
        type: 'input',
        label: "邮箱",
        placeholder: '请输入邮箱',
        field: 'email'
    }, {
        type: 'select',
        label: '客户来源',
        placeholder: '请输入客户来源',
        options: [{
            label: 'A平台',
            value: 0
        }, {
            label: 'B平台',
            value: 1
        }],
        field: 'se'

    }, {
        type: "date",
        label: '日期',
        placeholder: '请选择日期',
        field: 'da'
    },
    {
        type: 'switch',
        label: '是否启用',
        field: 'qy'
    }
    ]
};