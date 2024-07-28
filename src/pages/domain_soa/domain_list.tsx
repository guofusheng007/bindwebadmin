import React, {useEffect,useState,useRef} from 'react';
import { useNavigate,Navigate} from "react-router-dom";
import type { TableProps } from 'antd';
import { 
  message,
  Switch,
  Form, 
  Input, 
  InputNumber, 
  Popconfirm, 
  Table, 
  Typography,
  Button,
  Tag,
  Space,
} from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { 
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  EditOutlined,
} from '@ant-design/icons'; 
import { history } from 'umi';
import {ShareInfo} from "@/public/shareinfo";
import {GetStringRand,UpdaterecordInfo} from "@/public/sharefun";
import { Encrypt, Decrypt,EncryptIV, DecryptIV } from '@/public/crypto';
import axios from 'axios';
import cookie from 'react-cookies'
import Highlighter from 'react-highlight-words';
import NiceModal from "@ebay/nice-modal-react";
import AddDomainForm from './add_domain'

const token = cookie.load('TOKEN')

//定义数据类型
interface Item {
    key: React.Key;
    id: number;
    domain: string;
    primary_ns: string;
    active: boolean;
    registe_date: string;
    remark: string;
}
type DataIndex = keyof Item;

//---------------search配置----------------------------
//自定义hook.
//在使用 useState 自定义hook时，自定义的hook名称必须采用 "useXxxx"命名法，
//即以"use"开始，其后紧跟大驼峰命名法定义的字串。
//另外，在调用自定义hook时，不能在top level(即全局常量或变量)中调用，只能在函数中或函数中的常量中使用。
//  React Hook "useGetColumnSearch" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function
//search功能
function useGetColumnSearch(dataIndexRow: DataIndex) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: FilterDropdownProps['confirm'],
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Item> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    return (getColumnSearchProps(dataIndexRow))
}




const App: React.FC = () => {
  //const [pathname, setPathname] = useState('/about');
  //const [isPageContainer, setIsPageContainer] = useState(false);
  //跳转函数
  const navigate = useNavigate();

  //table更新时的状态值，此值有变化时将会更新table表。
  const [update, setUpdate] = useState("");

  //从cookie中读取当前用户的登录信息
  const appData = cookie.load('appData')
  const txt_dec = Decrypt(appData,ShareInfo.KeyCookie) 
  const AppConf = JSON.parse(txt_dec)
  const userid = AppConf.userid
  const username = AppConf.username

  //表的表头档配置，即表的行记录的每一个档位配置
  const columns: TableProps<Item>['columns'] = [
    /*
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sortDirections: ['ascend','descend'],
      sorter: (a, b) => a.id - b.id,  
      width:110,
    },
    */
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      //在档位上显示search输入框。
      ...useGetColumnSearch('domain'),
      width:180,
      sortDirections: ['ascend','descend'],
      //sorter: (a, b) => a.domain.length - b.domain.length,  
      sorter: (a, b) => a.domain.charCodeAt(0) - b.domain.charCodeAt(0)
    },
    {
      title: 'PrimaryNS',
      dataIndex: 'primary_ns',
      key: 'primary_ns',
      width:180,
    },
    {
      width:80,
      title: 'active',
      dataIndex: 'active',
      key: 'active',
      render:((value, record, index)=>{
        const onChange = async(checked: boolean) => {
          console.log(`switch to ${checked}`);
          const jsonData = {
            id: record.id,
            domain: record.domain,
            active: checked,
            remark: record.remark,
            flag:'active',
            db: 'zones'
          }
          //updaterecordInfo(jsonData)
          await UpdaterecordInfo(jsonData)    //更新后端的表
          setUpdate(GetStringRand(4))   //更新前端的表
        };
        return (
          <>
            <Switch 
              defaultChecked={value}                  //初始值
              checkedChildren={<CheckOutlined />}    //checkedChildren="开启"
              unCheckedChildren={<CloseOutlined />}  //unCheckedChildren="关闭" 
              onChange={onChange} 
              size="small"                           //开关大小，可选值：default small
            />
          </>
        );
      })
      
    },
    {
      title: 'RegisterDate',
      dataIndex: 'registe_date',
      key: 'registe_date',
      width:240,
    },
    {
      width:300,
      title: 'remark',
      dataIndex: 'remark',
      key: 'remark',
      render:((value, record, index)=>{
        //const [remark, setRemark] = useState(value);
        //console.log(record)
        return (<>
              <div style={{'wordBreak':'break-all'}}>
                <Typography.Text style={{ margin: 0 }} editable={{
                    text: value,       //编辑框中的当前值
                    onChange: async function(text){      //临时匿名函数
                      //setText_EditableStr2(text)
                      console.log("当前值:",text)
                      const jsonData = {
                        id: record.id,
                        domain: record.domain,
                        active: record.active,
                        remark: text,
                        flag:'remark',
                        db: 'zones'
                      }
                      //updaterecordInfo(jsonData)
                      await UpdaterecordInfo(jsonData)    //更新后端的表
                      setUpdate(GetStringRand(4))   //更新前端的表                      
                    },
                  }} 
                >
                  {value}
                </Typography.Text>
              </div>
        </>)
      })
    },
    {
      width:200,
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      //记录的该档位渲染
      //格式：
      //    render:(function(value, record, index) {})
      //    或
      //    render:((value, record, index) => {})
      //参数
      //   value为当前记录的当前列的值
      //   record当前行整数据
      //   index行索引
      render:((value, record, index)=>{
          //由于action档位是可选项，要先判断当前记录的该档位是否配置。
          //当档位存在时，执行如下代码
          //console.log(value)          //当前记录的该档位值
          //console.log(value.length)   //当前记录的该档位长度
          //console.log(record)          //当前记录值
          //console.log(index)           //当前记录index
          const onClickDelete = async() => {
            if (record.domain == 'test.io') {
              message.error('当前域名 test.io 是公测域名，不支持删除。')
              return
            }
            console.log("value:",value)
            const jsonData = {
              id: record.id,
              domain: record.domain,
              active: record.active,
              remark: record.remark,
              flag:'delete',
              db: 'zones'
            }
            //updaterecordInfo(jsonData)
            await UpdaterecordInfo(jsonData)    //更新后端的表
            setUpdate(GetStringRand(4))   //更新前端的表
          }
          const onClickRecord=() => {
            //setPathname('/domain/recordlist');
            //setIsPageContainer(true)
            navigate("/domain/recordlist/?domain=" + record.domain);
            //history.push("/domain/recordlist/?domain=" + record.domain)
          }
          return (<>
            <Space>
              <Typography.Link onClick={onClickRecord}>解析</Typography.Link>
              {
                (record.domain == 'test.io') ?(<Typography.Link disabled>Delete</Typography.Link>)
                :(<Popconfirm title="高危操作! Sure to Dele?"  
                    onConfirm={onClickDelete}
                    onCancel={()=>( console.log("取消"))}>
                    <Typography.Link>Delete</Typography.Link>
                  </Popconfirm>  
                )
              }
           
            </Space>
          </>)
          /*
            <Space>
            <Button type="text" size='small'>解析</Button>
            <Button type="text" size='small'>Edit</Button>
            <Button type="text" size='small'>Delete</Button>
            </Space>

            <a href="#" ><Tag color={'green'} >解析</Tag></a>
            <a href="#" ><Tag color={'green'} >Edit</Tag></a>
            <a href="#" ><Tag color={'volcano'} >Delete</Tag></a>
          */
      })
    },
  ];

  //屏幕大小识别
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    console.log("domain_list.tsx[]",(new Date()).toLocaleString())
    //当打开页面时，产生随机字串，来触发update值的变化
    setUpdate(GetStringRand(4))
    //当打开页面、页面屏幕大小发生变化时，计算屏幕大小。
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  //数据源加载
  const [loading, setLoading] = useState(false);              //数据加载中标识
  const [dataSource, setDataSource] = useState<Item[]>([]); 
  //在组件挂载后获取数据库中的初始值
  useEffect(() => {
    console.log("domain_list.tsx[update]",(new Date()).toLocaleString())
    //const url = 'http://192.168.3.110:8080/updateuserinfo/'+ userid
    setLoading(true);
    const url = ShareInfo.http_api + 'zoneapi/' + username
    axios({
      url:url,
      method: 'get',    //get或post等html方法。不区分大小写
      headers: {
         'Content-Type':'application/json',
         'AuthToken':token,
         'dycode': ((new Date()).getTime() - 1010101010101) 
      },
      //data: JSON.stringify(jsonData)  //body参数。
    }).then(response => {
      setLoading(false);
      if(response && response.status == 200){
        console.log('Data submitted successfully');
         // 响应成功的回调
         const db_result = response.data
         //console.log("array items:",db_result)
         //当数组不为空时
         if (db_result != null) {
          //console.log("array items:",db_result.length)
            const newArray = db_result.map((item:any)=>{   //其中的item是数据库返回的每行记录。
              return({key:item.id,...item})               //返回值是新数组的成员，与旧数组相比，添加key档位。
            })
            setDataSource(newArray);
         } else {
           setDataSource([]);
         }
      }else{
         // 响应失败
         console.log('Failed to submit data');
         message.error('后台服务异常:请查看后台服务或网络')
      }
    }).catch((Error) => {
      console.log("error",Error)
      if (Error.response.status == 302) {
        //return <Navigate to="/login" />
        history.push('/login');
      }
    });
  }, [update]);   //加载条件是update值发生变化。


  //添加记录
  //此函数传递给子组件。其中data是来自子组件在调用该事件时提供的数据，即子组件中的数据。
  const onOkHandle = (data:any) => {
    console.log("父组件中从子组件提取的值",data)
    /*
    const newData: Item = {
      key: count,
      id:  count,
      domain: `test${count}.io`,
      primary_ns:'ns1.mm-dns.com',
      active:true,
      registe_date: '2024-05-14 12:16:13',
      remark: `test${count}`,
    };
    setDataSource([...dataSource, newData]);
    */
    setUpdate(GetStringRand(4));   //添加新域名时，更新域名表。
  }
  //添加按扭的事件
  const handleAdd = () => {
    NiceModal.show(
      AddDomainForm, 
        {
            appName:<><Space><EditOutlined />Add domain</Space></>,
            onOkClick: onOkHandle,    //向子组件传递事件
        }
    )
  }
  /*
  const [count, setCount] = useState(300);
  const handleAdd = () => {
    const newData: Item = {
      key: count,
      id:  count,
      domain: `test${count}.io`,
      primary_ns:'ns1.mm-dns.com',
      active:true,
      registe_date: '2024-05-14 12:16:13',
      remark: `test${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  */
  
  //Selection配置
  const selectionType = true ? 'checkbox' : 'radio'
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  function onSelectChange(selectedRowKeys: React.Key[], selectedRows: Item[]) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`);
    console.log('selectedRows: ', selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  }
  const rowSelection = {
      //选择框的类型:'checkbox' 和 'radio'
      selectionType,
      //指定选中项的 key 数组，需要和 onChange 进行配合
      selectedRowKeys,
      //选中项发生变化时的回调
      onChange: onSelectChange,
      //下拉框菜单，默认不显示.配置true可显示
      selections: true,     //此时只显示默认菜单，即:Table.SELECTION_ALL,Table.SELECTION_INVERT,Table.SELECTION_NONE
  }
   
  return(
    <>
      <Space>
        <NiceModal.Provider>
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>Add Domain</Button>
        </NiceModal.Provider>
        <Button type="primary" style={{ marginBottom: 16 }} disabled>Delete Domain</Button>
      </Space>
      <Table  
        style= {{
            'wordWrap': 'break-word',
            //'whiteSpace': 'normal',
        }}
        columns={columns}   
        dataSource={dataSource}    
        //表格行是否可选择，值为object
        rowSelection={rowSelection}
        //数据加载中状态标识
        loading={loading}
        //分页配置,
        pagination={{        
              //单击分页控件时的事件       
              onChange: (page) => {
                console.log(page);
              },
              //在没有数据或只有一页数据时隐藏分页栏
              hideOnSinglePage: true,
              //pageSize每页的记录数。
              pageSize: 15,   
              //分页控件的位置           
              position: [                
                  'none',                //表上方的控件显示: topLeft，topCenter,topRight,none
                  'bottomRight'          //表下方的控件显示: bottomLeft，bottomCenter,bottomRight,none
              ]
        }}
        //滚动固定

        scroll={{ 
            //当分页、排序、筛选变化后是否滚动到表格顶部
            //scrollToFirstRowOnChange:true,  

            //设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值
            x: windowSize.width > 1000 ? windowSize.width - 340 : 800,  

            y: windowSize.height > 500 ? windowSize.height - 390 : 300

            //设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content'                               
            //x: 1500,                          
        }}

      />
      {/* 
      <pre>格式化后的json字串<br/>{JSON.stringify(dataSource, null, 2)}</pre>
      */}
    </>
  )
};

export default App;