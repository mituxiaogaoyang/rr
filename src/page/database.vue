<template>
    <div class='banner_page'>
         <el-button type="primary" plain @click="addItem">新增</el-button>
         <el-table  :data="tableData" border  >
             <el-table-column
                prop="sort"
                label="排序"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="statusName"
                label="启用状态"
                align="center"
                width="120">
            </el-table-column>
            <el-table-column
                prop="time"
                align="center"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="changeStatus(scope.row)" type="text" size="small">{{scope.row.status?'禁用':'启用'}}</el-button>
                    <el-button @click="modify(scope.row)" type="text" size="small">编辑</el-button>
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
    import {getDatabaseList, deleteDatabase,changeDatabaseStatus} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                page:{
                    current: 1,
                    total:1
                },
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(i){
                const params = {
                    page: this.page.current,
                    pageSize: 10,
                }
                getDatabaseList(params).then(res =>{
                    this.page.total = res.totalCount;
                    const lists = res.items;
                    lists.forEach(item =>{
                        let time;
                        if(item.updateTime){
                            time = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss');
                        }else{
                            time = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        item.time = time;
                        item.statusName = item.status?'启用':'禁用';
                    })
                    this.tableData = lists;
                });
            },
            handleCurrentChange(i){
                this.page.current = i;
                this.getData(i);
            },
            addItem(){
                this.$router.push('/databaseDetail');
            },
            modify(row){
                this.$router.push({path:'/databaseDetail',query:{id:row.id}});
            },
            changeStatus(row){
                //const type = this.$route.query.type;
                const isOpen = row.status?'disable':'enable'; //metting
                changeDatabaseStatus(row.id,isOpen).then(res =>{
                    this.$message.success('修改成功');
                    this.getData();
                })
            },
            remove(id){
                this.$confirm('确定删除该数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteDatabase(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    
                    }).catch(() => {
                                
                    });
            }
        },
    };
</script>

<style lang='less' scoped>

</style>