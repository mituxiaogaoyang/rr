<template>
    <div class='banner_page'>
         <el-button type="primary" plain @click="addItem">新增</el-button>
         <el-table  :data="tableData" border>
             <el-table-column
                prop="sort"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="position"
                label="类型"
                width="210">
            </el-table-column>
            <el-table-column
                prop="name"
                label="图片"
                width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.status?'已发布':'未发布'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="linkMenu"
                label="菜单">
            </el-table-column>
            <el-table-column
                prop="linkId"
                label="id">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="210">
                <template slot-scope="scope">
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
    import bannerAdd from '@/components/bannerAdd.vue'; 
    import {getMenuList, getCompanyInfo, deleteJob} from '@/apis/home';
    export default {
        components: {bannerAdd},
        data () {
            return {
                visibleAdd:false,
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
                getCompanyInfo().then(res =>{
                    this.page.total = res.totalCount;
                    const lists = res.items;
                    this.tableData = lists;
                });
            },
            handleCurrentChange(i){
                this.getData(i);
            },
            addItem(){
                this.$router.push('/addBanner');
            },
            modify(row){
                if(row.publishState){
                    this.$message.warning('不能编辑已发布内容，如需修改，请取消发布');
                }else{
                    this.$router.push({path:'/addJob',query:{id:row.id}});
                }
            },
            remove(id){
                this.$confirm('确定删除该职位?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteJob(id).then(res =>{
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