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
                prop="siteName"
                label="类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="图片"
                >
                <template slot-scope="scope">
                    <div class="img_box"><img :src="scope.row.picUrl" alt=""></div>
                </template>
            </el-table-column>
            <el-table-column
                prop="linkUrl"
                label="链接地址">
                <template slot-scope="scope">
                    <a :href="scope.row.linkUrl" target="_blank">{{scope.row.linkUrl}}</a>
                </template>
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
        <!-- <el-pagination
            layout="prev, pager, next"
            :page-size="10"
            :current-page='page.current'
            @current-change="handleCurrentChange"
            :total="page.total">
        </el-pagination> -->
    </div>
</template>

<script>
    import bannerAdd from '@/components/bannerAdd.vue'; 
    import {getBannerList, deleteBanner, deleteJob} from '@/apis/home';
    const siteList =[
        {type:1, title:'上部轮播图'},
        {type:2, title:'中部轮播图'},
    ]
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
                getBannerList().then(res =>{
                    this.page.total = res.totalCount;
                    const lists = res.data;
                    lists.forEach(list =>{
                        list.siteName = siteList.find(item => item.type == list.type).title;
                    })
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
                    this.$router.push({path:'/addBanner',query:{id:row.id}});
                }
            },
            remove(id){
                this.$confirm('确定删除该条记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteBanner(id).then(res =>{
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
.img_box{
    max-width:400px;
    display: block;
    max-height: 80px;
    overflow: hidden;
}
.banner_page{
    padding-bottom: 30px;
}
</style>