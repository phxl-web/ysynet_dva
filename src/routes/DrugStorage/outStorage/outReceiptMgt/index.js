/*
 * @Author: yuwei  出库管理 /output
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import { Table , Form, Row, Col, Button, Icon, Select , Input , DatePicker , Modal , message} from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import { createData } from '../../../../common/data';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Confirm = Modal.confirm;
const columns = [
  {
   title: '出库单',
   dataIndex: 'medicinalCode',
   width:150,
   render:(text)=>
   <span>
      <Link to={{pathname: `/drugStorage/outStorage/outReceiptMgt/details`}}>{text}</Link>
    </span>
  },
  {
    title: '拣货单',
    width:180,
    dataIndex: 'planNo',
  },
  {
    title: '出库分类',
    width:100,
    dataIndex: 'fmodal2',
    render:(text)=>'领用出库'
  },
  {
    title: '状态',
    width:100,
    dataIndex: 'spec21',
    render:(text)=>'待复核'
  },
  {
    title: '申领部门',
    width:100,
    dataIndex: 'custodian',
    render: (text, record, index) => '静配中心'
  },
  {
    title: '发起人',
    width:100,
    dataIndex: 'bDept',
    render: (text, record, index) => '王文斌'
  },
  {
   title: '发起时间',
   dataIndex: 'useDept',
   width:120,
   render: (text, record, index) => '2018-7-25 21:17'
  },
 {
  title: '复核人',
  width:100,
  dataIndex: 'useDept1',
  render: (text, record, index) => '张冰冰'
 },
 {
  title: '复核时间',
  width:160,
  dataIndex: 'useDept21',
  render: (text, record, index) => '2018-7-25 21:17'
 }
];

class Output extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
    }
  }
  queryHandler = (query) => {
    this.setState({ query:query })
  }

  //删除
  delete = () => {
    Confirm({
      content:'您确定要删除吗？',
      onOk:()=>{
        message.success('删除成功！')
      }
    })
  }
  render(){
    return (
      <div className='ysynet-main-content'>
        <SearchForm query={this.queryHandler} />
        <Row>
          <Button type='primary' className='button-gap'>
            <Link to={{pathname:`/drugStorage/outStorage/outReceiptMgt/add`}}>新建出库</Link>
          </Button>
          <Button onClick={this.delete}>删除</Button>
        </Row>
        <Table
          rowSelection={{
            onChange:(selectedRowKeys,selectedRows)=>{
              console.log(selectedRowKeys,selectedRows)
            }
          }}
          dataSource={createData()}
          bordered
          loading={ this.state.loading}
          scroll={{x: '100%'}}
          pagination={{
            size: "small",
            showQuickJumper: true,
            showSizeChanger: true
          }}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        /> 
      </div>
    )
  }
}
export default Output;
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
 state = {
   display: 'none',
 }
 toggle = () => {
   const { display, expand } = this.state;
   this.setState({
     display: display === 'none' ? 'block' : 'none',
     expand: !expand
   })
 }
 handleSearch = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     this.props.query(values);
   });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 render() {
   const { display } = this.state;
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`申领部门`} {...formItemLayout}>
             {getFieldDecorator('assetCode', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                    <Option key="" value="">全部</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`出库时间`} {...formItemLayout}>
             {getFieldDecorator('assetName', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`出库分类`} {...formItemLayout}>
             {getFieldDecorator('spec')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="" value="">全部</Option>
                <Option key="01" value="01">领用出库</Option>
                <Option key="02" value="02">召回</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('manageDeptGuid')(
              <Input placeholder='出库单/拣货单'/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('useDeptGuid')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                <Option key="" value="">全部</Option>
                <Option key="01" value="01">待复核</Option>
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{ textAlign: 'right', marginTop: 4}} >
           <Button type="primary" htmlType="submit">查询</Button>
           <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
           <a style={{marginLeft: 8, fontSize: 14}} onClick={this.toggle}>
             {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
           </a>
         </Col>
       </Row>
     </Form>
   )
 }
}
const SearchForm = Form.create()(SearchFormWrapper);