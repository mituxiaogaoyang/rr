<template>
  <div id="orderList">
    <div class="block">
        <div class="search_line" style="margin-right:20px">
            <el-input
                type="text"
                clearable
                placeholder="请输入订单号"
                @change="getData(1)"
                style="width:180px"
                v-model="orderCode">
            </el-input>
            <el-button type="primary" plain class="btn_add2" @click="getData(1)">搜索</el-button>
        </div>
        <div class="search_line">
            <el-select v-model="status" clearable placeholder="订单状态" @change="getData(1)">
                <el-option
                v-for="item in states"
                :key="item.val"
                :label="item.label"
                :value="item.val">
                </el-option>
            </el-select>
        </div>
        <div class="search_line">
            <span class="demonstration">支付开始时间</span>
            <el-date-picker
            v-model="startTime"
            type="datetime"
            value-format="yyyyMMddHHmmss"
            @change="time => getData(1)"
            placeholder="选择日期">
            </el-date-picker>
        </div>
        
    </div>
    <el-table  :data="tableData" border>
        <el-table-column
            label="订单号"
            prop="orderCode"
            width="160">
        </el-table-column>
        <el-table-column
            label="第三方订单号"
            prop="thirdOrderCode"
            width="160">
        </el-table-column>
        <el-table-column
            label="文件名"
            prop="title"
            minWidth="150">
        </el-table-column>
        <el-table-column
            prop="userName"
            width="120"
            label="用户名">
        </el-table-column>
        <el-table-column
            prop="totalAmount"
            width="100"
            label="金额">
        </el-table-column>
        <el-table-column
            prop="statusStr"
            width="120"
            label="支付状态">
        </el-table-column>
        <el-table-column
            prop="payTime"
            :formatter="dateFormat"
            width="100"
            label="支付时间">
        </el-table-column>
        <el-table-column
            prop="payTypeStr"
            width="120"
            label="支付方式">
        </el-table-column>
        <el-table-column
            prop="companyAddress"
            minWidth="140"
            label="公司/大学/机构名称">
        </el-table-column>
        <el-table-column
            prop="email"
            minWidth="120"
            label="邮箱">
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
                <el-button @click="viewDetail(scope.row.id)" type="text" size="small">相关文件</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        
        layout="prev, pager, next"
        :page-size="10"
        :current-page='page.current'
        @current-change="handleCurrentChange"
        :total="page.total">
    </el-pagination>
    <el-dialog title="相关文件" :visible.sync="dialogTableVisible">
        <el-table :data="fileData">
            <el-table-column type="index" width="150"></el-table-column>
            <el-table-column property="fileResourceName" label="文件名" minWidth="200"></el-table-column>
            <el-table-column property="amount" label="价格"></el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {getOrders, getOrderDetail} from '@/apis/home';
import moment from 'moment';
const states = [
    {label: '待支付',val:0},
    {label: '已支付',val:1},
    {label: '已下载',val:2},
]
export default {
    data(){
        return{
            states,
            status:'',
            startTime:'',
            orderCode:'',
            tableData:[],
            page:{
                current: 1,
                total:1
            },
            dialogTableVisible: false,
            fileData:[]
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(i){
            const page = i || 1;
            let obj = {
                page: page,  
                startTime: this.startTime,
                status:this.status,
                orderCode: this.orderCode
            };
            getOrders(obj).then(res =>{
                const lists = res.items;      
                this.page.total = res.totalCount;
                this.tableData = lists;
            })
        },
        handleCurrentChange(i){
            this.page.current = i;
            this.getData(i);
        },
        viewDetail(id){  
            getOrderDetail(id).then(res =>{
                this.dialogTableVisible = true;
                this.fileData = res.data;
            })
        },
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
    }
}
</script>

<style lang="less"> 
#orderList{
    .block{
        display: flex;
        .search_line{

        }
    }
}
</style>