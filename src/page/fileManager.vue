<template>
    <div class="contact">
        <el-tabs type="border-card">
            <el-tab-pane label="文件上传">
                <file-upload></file-upload>
            </el-tab-pane>
            <el-tab-pane label="文件统计">
                <el-table  :data="tableData" border>
                    <el-table-column
                        label="序号"
                        type="index"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        show-overflow-tooltip
                        
                        label="文件名">
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import {apiContextPath,getFilesRecord, setContact} from '@/apis/home';
    import fileUpload from './fileUpload';
    export default {
        components:{fileUpload},
        data () {
            return {
               headers:{
                    'access-token':sessionStorage.getItem('access_token')
                },
                tableData: [],
                page:{
                    current: 1,
                    total:1
                }
            };
        },
        mounted () {
            this.getData()
        },
        methods: {
            getData(i){
                let obj = {
                    page: i || 1,
                };
                getFilesRecord(obj).then(res =>{
                    const lists = res.items;
                    
                    this.page.total = res.totalCount;
                    this.tableData = lists;
                })
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
            onSubmit(){
                setContact({...this.form}).then(res =>{
                    this.$message.success('编辑成功');
                    this.getData();
                })
            },
            uploadSuccess(res,file){
                this.form.officiaAccountQrCode =  file.response.data;
            },
            remove(){}
            
        },
    };
</script>
<style lang="less">
    .contact{
       
    }
</style>