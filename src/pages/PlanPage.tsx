import * as React from 'react';
import {useEffect, useState} from "react";
import {PlanItems} from "../models/PlanItems";
import {servicesAPI} from "../services/api";
import {Content} from "antd/es/layout/layout";
import {Button, Card, Form, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import { Typography } from 'antd';
import {
    DeleteOutlined
} from '@ant-design/icons';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Title } = Typography;

interface FormItems {
    date:string,
    startDate:string,
    endDate:string
}
const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};
const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

function PlanPage() {
    const [planItems, setPlanItems] = useState<PlanItems[]>([])
    const [form] = Form.useForm();
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const getAllPlanner = () =>{
        setIsLoading(true)
        servicesAPI.plannerItemsAPI.findAllForecastPlanerItems()
            .then((value)=>setPlanItems(value))
            .finally(()=>setIsLoading(false))
    }
    const addNewPlanner = (values:FormItems):Promise<any> => {
        return  servicesAPI.plannerItemsAPI.addNewForecastPlannerItem(values.date,values.startDate, values.endDate)
    }
    const deletePlanner = (id:string):Promise<any> => {
        return servicesAPI.plannerItemsAPI.deleteForecastPlannerItemById(id)
    }
    useEffect(()=>{
        getAllPlanner()
    },[])

    const onFinish = (fieldsValue: any) => {
        const rangeValue = fieldsValue['range-picker'];
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date-picker']!.format('YYYY-MM-DD')!,
            'startDate': rangeValue[0]!.format('YYYY-MM-DD')!,
            'endDate':  rangeValue[1]!.format('YYYY-MM-DD')!,
        };
        addNewPlanner(values).then(()=>{
            //getAllPlanner() Пост запрос у вас не работает, и не было идентифицирущий токен
            const newArr:PlanItems = {dateOfSend:values.date, id:Math.random().toString(),forecastEnd:values.endDate,forecastStart:values.startDate}
            setPlanItems((prevState)=>[...prevState, newArr])
        })
    };


    const columns: ColumnsType<PlanItems> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key:"id"
        },
        {
            title: 'Дата отправки',
            dataIndex: 'dateOfSend',
            key:"dateOfSend"
        },
        {
            title: 'Прогноз на период',
            dataIndex: 'range',
            key:"range",
            render:(text,record)=>{
                return <> {record.forecastStart} - {record.forecastEnd} </>
            }
        },
        {
            title: 'Операции',
            dataIndex: 'name',
            render:(text,record)=>{
                return <Button onClick={()=>{
                    deletePlanner(record.id).then(()=>{
                        const filteredArr = planItems.filter(item=>item.id !== record.id )
                        setPlanItems(filteredArr)
                    })
                }}>
                    <DeleteOutlined />
                </Button>
            }
        }
    ]


    return (
        <Content style={{ padding: '0 50px' }}>
            <Card  bordered={false} style={{ width: "100%" }}>
                <Title level={3}> Планировщик</Title>
                <Title level={4}> Запланированные задачи</Title>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={planItems}
                    rowKey="id"
                />
                <Title level={4}> Добавить новую </Title>
                <Form
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name={"date-picker"}
                        label={"Дата заявки"}
                        {...config}
                        rules={[{ required: true, message: 'Заполните дату' }]}
                    >
                        <DatePicker   />
                    </Form.Item>
                    <Form.Item
                        name={"range-picker"}
                        label={"Дата с и дата по"}
                        {...rangeConfig}
                        rules={[{ required: true, message: 'Заполните датс и дата по' }]}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button htmlType="submit" type={"primary"}>
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Content>
    )
}

export default PlanPage;
