<template>
    <div class='banner_page'>
        <div class="ceil">
            <div class="search_box">
                <span class="label">状态：</span>
                <el-select v-model="status" clearable placeholder="请选择" @change="getData(1)">
                    <el-option
                    v-for="item in states"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" plain class="btn_add" @click="addNews">新增</el-button>
        </div>
        
        <el-table  :data="tableData" border>
            <el-table-column
                label="序号"
                type="index"
                width="90">
            </el-table-column>
            <el-table-column
                prop="title"
                show-overflow-tooltip
                
                label="标题">
            </el-table-column>

            <el-table-column
                label="状态"
                width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.status?'已发布':'未发布'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
                :formatter="dateFormat"
                width="240">
            </el-table-column>
            <el-table-column
                prop="address"
                width="250"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="publish(scope.row)" type="text" size="small">{{scope.row.status?'取消发布':'发布'}}</el-button>
                    <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
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
    </div>
</template>

<script>
    import moment from 'moment';
    import { states, getNews, publishNews, deleteNews} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                typeNews: null,
                states: states,
                status: '',
                page:{
                    current: 1,
                    total:1
                }
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(i){ //i -currentpage
                const page = i || 1;
                let obj = {
                    page: page,
                };
                this.status !== '' && (obj.status =this.status);
                getNews(obj).then(res =>{
                    
                    const lists = res.items;
                    
                    this.page.total = res.totalCount;
                    this.tableData = lists;
                });
            },
            handleCurrentChange(i){
                this.page.current = i;
                this.getData(i);
            },
            dateFormat(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            addNews(){
                this.$router.push('/addNews');
            },
            publish(row){
                const state = row.status?0:1 ;
                const word = row.status?'取消发布':'发布';
                this.$confirm('确定'+word+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        publishNews(row.id,state).then(res =>{
                            this.getData(this.page.current);
                        });
                    }).catch(() => {            
                    });
                
            },
            modify(row){
                if(row.status){
                    this.$message.warning('不能编辑已发布内容，如需修改，请取消发布');
                }else{
                    this.$router.push({path:'/addNews',query:{id:row.id}});
                }
            },
            remove(id){
                this.$confirm('确定删除该新闻?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteNews(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData(this.page.current);
                        });
                    
                    }).catch(() => {
                                
                    });
            }
        },
    };
</script>

<style lang='less' scoped>
.banner_page{
    .ceil{
        display: flex;
        justify-content: space-between;
    }
    .btn_see{
        text-decoration: none;
        color:rgba(224, 177, 95, 0.7);
        font-size: 14px;
    }
    .word_noSite{
        color:#999;
        font-size: 14px;
    }
}
</style>
<style lang="less">
    .el-select{
        margin-right: 30px;
        .el-input .el-input__inner{
            border-width: 1px;
        }
    }
</style>