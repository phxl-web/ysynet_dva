/*
 * @Author: yuwei  新建出库 /output
 * @Date: 2018-07-24 13:12:15 
* @Last Modified time: 2018-07-24 13:12:15 
 */

import React, { PureComponent } from 'react';
import {Form, Row, Col, Button, Icon, Select, Input, DatePicker, Modal, message} from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout } from '../../../../utils/commonStyles';
import RemoteTable from '../../../../components/TableGrid/index';
import {outStorage} from '../../../../api/drugStorage/outStorage';
import {connect} from 'dva';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Confirm = Modal.confirm;
const columns = [
  {
   title: '出库单',
   dataIndex: 'backNo',
   width:150,
   render:(text, record)=>
   <span>
      <Link to={{pathname: `/pharmacy/outStorage/newOut/details/id=${record.backNo}&state=${record.outStoreStatus}`}}>{text}</Link>
    </span>
  },
  {
    title: '拣货单',
    width:180,
    dataIndex: 'pickingNo',
  },
  {
    title: '出库分类',
    width:100,
    dataIndex: 'backType',
  },
  {
    title: '状态',
    width:100,
    dataIndex: 'status',
  },
  {
    title: '申领部门',
    width:100,
    dataIndex: 'deptName'
  },
  {
    title: '发起人',
    width:100,
    dataIndex: 'createUserName'
  },
  {
   title: '发起时间',
   dataIndex: 'createDate',
   width:120
  },
 {
  title: '复核人',
  width:100,
  dataIndex: 'checkUserName'
 },
 {
  title: '复核时间',
  width:160,
  dataIndex: 'checkDate'
 }
];

class Output extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      query:{},
      selected: []
    }
  }
  queryHandler = (query) => {
    this.setState({query: query})
  }

  //删除
  delete = () => {
    let {selected} = this.state;
    if(selected.length === 0) {
      message.warning('请选择一条数据');
      return;
    }
    let ids = selected;
    Confirm({
      content:'您确定要删除吗？',
      onOk:()=>{
        this.props.dispatch({
          type: 'outStorage/deleteOutStore',
          payload: {
            ids
          },
          callback: (data) => {
            message.success('删除成功');
            let {query} = this.state;
            this.refs.tab.fetch(query);
          }
        })
      }
    })
  }
  render(){
    let {query} = this.state;
    return (
      <div className='ysynet-main-content'>
        <SearchForm dispatch={this.props.dispatch} query={this.queryHandler} />
        <Row>
          <Button type='primary' className='button-gap'>
            <Link to={{pathname:`/pharmacyAddNewOutput`}}>新建出库</Link>
          </Button>
          <Button onClick={this.delete}>删除</Button>
        </Row>
        <RemoteTable
          query={query}
          url={outStorage.OUTSTORELIST}
          rowSelection={{
            onChange:(selectedRowKeys,selectedRows)=>{
              this.setState({selected: selectedRowKeys})
            },
            getCheckboxProps: (record) => ({
              disabled: record.outStoreStatus !== 3
            })
          }}
          ref="tab"
          scroll={{x: '150%'}}
          columns={columns}
          rowKey={'id'}
          style={{marginTop: 20}}
        /> 
      </div>
    )
  }
}
export default connect(state=>state)(Output);
/* 搜索 - 表单 */
class SearchFormWrapper extends PureComponent {
 state = {
   display: 'none',
   status: [],
   type: [],
   dept: []
 }
 componentDidMount() {
  this.props.dispatch({
    type: 'base/orderStatusOrorderType',
    payload: {
      type: 'out_store_status'
    },
    callback: (data) => {
      this.setState({status: data});
    }
  });
  this.props.dispatch({
    type: 'base/orderStatusOrorderType',
    payload: {
      type: 'out_store_type'
    },
    callback: (data) => {
      this.setState({type: data});
    }
  });
  this.props.dispatch({
    type: 'base/findAllDepts',
    callback: (data) => {
      this.setState({
        dept: data
      });
    }
  })
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
    let {time} = values;
    if(time.length > 0) {
      values.startTime = time[0].format('YYYY-MM-DD');
      values.endTime = time[1].format('YYYY-MM-DD');
    }else {
      values.startTime = '';
      values.endTime = '';
    };
    delete values.time;
    this.props.query(values);
  });
 }
 //重置
 handleReset = () => {
   this.props.form.resetFields();
   this.props.query({});
 }

 dataRender = (data) => {
   return data.map((item, i)=>{
     return <Option key={i} value={item.value}>{item.label}</Option>
   })
 }

 render() {
   let {display, status, type, dept} = this.state;
   const { getFieldDecorator } = this.props.form;
   status = this.dataRender(status);
   type = this.dataRender(type);
   dept = dept.map((item, i) => {
     return <Option key={i} value={item.id}>{item.deptName}</Option>
   });

   return (
     <Form onSubmit={this.handleSearch}>
       <Row gutter={30}>
         <Col span={8}>
           <FormItem label={`申领部门`} {...formItemLayout}>
             {getFieldDecorator('deptCode', {})(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                {dept}
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8}>
           <FormItem label={`出库时间`} {...formItemLayout}>
             {getFieldDecorator('time', {})(
              <RangePicker/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`出库分类`} {...formItemLayout}>
             {getFieldDecorator('backType')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                {type}
              </Select>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`单据号`} {...formItemLayout}>
             {getFieldDecorator('orderNo')(
              <Input placeholder='出库单/拣货单'/>
             )}
           </FormItem>
         </Col>
         <Col span={8} style={{display: display}}>
           <FormItem label={`状态`} {...formItemLayout}>
             {getFieldDecorator('backStatus')(
              <Select 
                showSearch
                placeholder={'请选择'}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                {status}
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