/*
 * @Author: yuwei  出库管理新建 /output/add
 * @Date: 2018-07-24 13:13:55 
* @Last Modified time: 2018-07-24 13:13:55 
 */
import React, { PureComponent } from 'react';
import { Table , Col, Button, Modal , Card , message, Input , Select , Affix , Row , Tooltip} from 'antd';
import { createData } from '../../../../common/data';
const Conform = Modal.confirm;
const Option = Select.Option;
const columns = [
  {
   title: '数量',
   width:150,
   dataIndex: 'medicinalCode',
   render:()=>(<Input/>)
  },
  {
    title: '当前库存',
    width:120,
    dataIndex: 'assetsRecord',
    render:()=>`1000`
  },
  {
    title: '单位',
    width:150,
    dataIndex: 'unit1',
    render:(text)=>'g'
  },
  {
    title: '通用名称',
    width:100,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '商品名称',
    width:150,
    dataIndex: 'productName',
  },
  {
    title: '规格',
    width:150,
    dataIndex: 'spec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '剂型',
    width:150,
    dataIndex: 'fmodal',
  },
  {
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
  },
  {
    title: '生产批号',
    width:150,
    dataIndex: 'applyNo',
  },
  {
    title: '生产日期',
    width:150,
    dataIndex: 'productCompany3',
    render:(text,record)=>`${record.planTime}`
  },
  {
    title: '有效期至',
    width:150,
    dataIndex: 'productCompany4',
    render:(text,record)=>`${record.planTime}`
  },
  {
    title: '生产厂家',
    width:150,
    dataIndex: 'productCompany',
  },
  {
    title: '供应商',
    width:150,
    dataIndex: 'gongyingshang',
    render:(text,record)=>`${record.createUser}`
  },
  {
    title: '批准文号',
    width:150,
    dataIndex: 'approvalNo',
  }
];
const modalColumns = [
  {
    title: '通用名称',
    width:100,
    dataIndex: 'productName1',
    render:(text,record)=>record.productName
  },
  {
    title: '商品名称',
    width:150,
    dataIndex: 'productName',
  },
  {
    title: '规格',
    width:150,
    dataIndex: 'spec',
    className:'ellipsis',
    render:(text)=>(
      <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    )
  },
  {
    title: '剂型',
    width:150,
    dataIndex: 'fmodal',
  },
  {
    title: '包装规格',
    width:150,
    dataIndex: 'unit',
  },
  {
    title: '生产厂家',
    width:150,
    dataIndex: 'productCompany',
  },
  {
    title: '批准文号',
    width:150,
    dataIndex: 'approvalNo',
  }
]
class AddOutput extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      selectedRowKey:[],
      visible:false
    }
  }

  //移除
  delete = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('删除成功！')
      },
      onCancel:()=>{}
    })
  }

  //提交该出库单
  onSubmit = () =>{
    Conform({
      content:"您确定要执行此操作？",
      onOk:()=>{
        message.success('操作成功！')
        const { history } = this.props;
        history.push({pathname:"/drugStorage/drugStorageManage/output"})
      },
      onCancel:()=>{}
    })
  }

  //添加产品 到 主表
  addToMain = () => {
    const { selectedRowKey } =this.state;
    if(selectedRowKey.length>0){
      this.setState({visible:false,selectedRowKey:[]})
      
    }else{
      message.warn('最少选择一个产品添加！')
    }
  }

  render(){
    const { visible , selectedRowKey } = this.state; 
    return (
      <div className='fullCol'>
        <div className='fullCol-fullChild' style={{height:70}}>
          <Col  span={4}>
            <Button type='primary' className='button-gap' onClick={()=>this.setState({visible:true})}>添加产品</Button>
            <Button onClick={()=>this.delete()} >移除</Button>
          </Col>
          <Col span={6}>
              目的部门：
              <Select 
                style={{width:'70%'}}
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="" value="">全部</Option>
              </Select>
          </Col>
          <Col span={6}>
            出库类型：
              <Select 
                style={{width:'70%'}}
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="00" value="00">调拨出库</Option>
                <Option key="01" value="01">损益补录</Option>
              </Select>
          </Col>
        </div>
        <Card>
          <Table
            rowSelection={{
              onChange:(selectedRowKey)=>{
                this.setState({selectedRowKey})
              }
            }}
            title={()=>`产品信息`}
            dataSource={createData()}
            bordered
            scroll={{x: '200%'}}
            columns={columns}
            rowKey={'id'}
            style={{marginTop: 24}}
          />
        </Card>
        <Affix offsetBottom={0} className='affix'>共10种产品
         <Button  style={{float:'right'}}  onClick={() => this.onSubmit()}>
            取消
          </Button>
          <Button  type="primary" className='button-gap' style={{float:'right'}} onClick={() => this.onSubmit()}>
            确定
          </Button>
        </Affix>

        {/*选择产品-弹窗*/}
        <Modal title='选择页面' visible={visible} width={980}
          onOk={()=>this.addToMain()}
          onCancel={()=>this.setState({visible:false,selectedRowKey:[]})}>
          <Row>
            <Input placeholder='通用名/商品名' style={{width:200}}/>
          </Row>
          <Table
            rowSelection={{
              selectedRowKeys:selectedRowKey,
              onChange:(selectedRowKey)=>{
                this.setState({selectedRowKey})
              }
            }}
            dataSource={createData()}
            bordered
            scroll={{x: '200%'}}
            columns={modalColumns}
            rowKey={'id'}
          />
        </Modal>

      </div>
    )
  }
}
export default AddOutput;