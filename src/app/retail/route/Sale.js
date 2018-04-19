import React, { PureComponent } from 'react';
import { connect } from 'dva';
import cs from 'classnames';
import { Form, Table, Icon, Row, Col, Card, InputNumber, Button, Divider } from 'antd';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import Page from 'components/Page';
import style from './Sale.less';

const FormItem = Form.Item;
/**
 * 销售开单界面
 */
@Form.create()
@connect(state => ({
  sale: state.sale,
}))
export default class Sale extends PureComponent {
  componentDidMount() {
    console.info('sale loaded');
  }
  // 移除商品
  handleRemove = id => {
    let { invoice } = this.props.sale;
    invoice = invoice.filter(item => {
      return item.id !== id;
    });
    this.props.dispatch({
      type: 'sale/updateState',
      payload: {
        invoice: invoice,
      },
    });
  };
  // 价格更改 - 重新计算总价
  priceChange = () => {
    const { getFieldsValue } = this.props.form;
    const priceArray = Object.values(getFieldsValue());

    let totalPrice = 0;
    priceArray.forEach(v => {
      if (!isNaN(v)) totalPrice += v;
    });
    // 更新商品总价
    this.props.dispatch({
      type: 'sale/updateState',
      payload: {
        total: totalPrice,
      },
    });
  };
  // 收钱按钮
  handleCashBtnClick = () => {
    const { invoice } = this.props.sale;
    const { getFieldsValue } = this.props.form;
    const records = getFieldsValue();

    invoice.map(item => {
      item.price = records[item.id];
      item.goodsId = item.id;
      return item;
    });
    // 算钱
    this.props.dispatch({
      type: 'sale/checkOut',
      payload: {
        param: invoice,
      },
    });
  };
  // 添加商品
  handleGoodsClick = record => {
    const { invoice } = this.props.sale;
    // 如果已选清单中存在忽略
    let hasAdded = invoice.find(item => item.id === record.id);
    if (hasAdded) return;

    invoice.push(record);

    this.props.dispatch({
      type: 'sale/updateState',
      payload: {
        invoice: invoice,
      },
    });
  };

  // 渲染菜单
  renderItem = data => {
    return data.map(item => {
      return (
        <Card.Grid
          key={item.id}
          className={style.gridStyle}
          onClick={() => this.handleGoodsClick(item)}
        >
          {item.title}
        </Card.Grid>
      );
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { goods, invoice, total } = this.props.sale;

    const columns = [
      {
        title: '品名',
        dataIndex: 'title',
      },
      {
        title: '数量',
        dataIndex: 'nummer',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => {
          const id = record.id;
          return getFieldDecorator(id)(<InputNumber min={0} onBlur={() => this.priceChange()} />);
        },
      },
      {
        title: '移除',
        render: (text, record) => {
          return (
            <Icon
              type="delete"
              onClick={() => this.handleRemove(record.id)}
              className={style.removeBtn}
            />
          );
        },
      },
    ];

    return (
      <PageHeaderLayout title="零售开单">
        <Page className={style.pageWrapper} inner>
          <Row gutter={16} className={style.flex_stretch}>
            {/*第一列*/}
            <Col span={16} className={style.left_col}>
              <Card bordered={false} className={style.gridWrapper}>
                {this.renderItem(goods)}
              </Card>
            </Col>
            {/*第二列*/}
            <Col span={8} className={style.fullHeightCol}>
              <Form>
                {/*顶部已选列表*/}
                <Table
                  locale={{ emptyText: '暂无' }}
                  className={style.listHeight}
                  dataSource={invoice}
                  columns={columns}
                  pagination={false}
                  rowKey={record => record.id}
                />
              </Form>
              <Row className={style.footer_row}>
                <Col className={style.footbar_left} span={18}>
                  <div className={cs(style.text_left, style.total)}>
                    合计 <Divider type="vertical" /> {total} 元
                  </div>
                </Col>
                <Col className={style.footbar_right} span={6}>
                  <Button
                    type="primary"
                    className={style.checkOutBtn}
                    onClick={() => this.handleCashBtnClick()}
                  >
                    收钱
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Page>
      </PageHeaderLayout>
    );
  }
}
