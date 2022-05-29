<template>
    <div class="fileManager">
        <el-tabs type="border-card">
            <el-tab-pane label="文件上传">
                <file-upload @updateList="getList"></file-upload>
            </el-tab-pane>
            <el-tab-pane label="文件管理">
                 <div class="search_box">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="元素代码（多个用英文逗号隔开）"
                        style="width:240px"
                        v-model="searchObj.eles">
                    </el-input>
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入文件名称"
                        style="width:180px"
                        v-model="searchObj.name">
                    </el-input>
                    <el-button type="primary" plain class="btn_add2" size="small" @click="() =>getList()">搜索</el-button>
                 </div>
                <el-table  :data="tableData2" border>
                    <el-table-column
                        label="序号"
                        type="index"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="fileSourceName"
                        show-overflow-tooltip
                        label="文件名">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        width="100"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        width="100"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status?'启用':'禁用'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        :formatter="dateFormat"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        width="180"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="viewDetail(scope.row.id)" type="text" size="small">详情</el-button>
                            <el-button @click="changeStatus(scope.row)" type="text" size="small">{{scope.row.status?'禁用':'启用'}}</el-button>
                            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    layout="prev, pager, next"
                    :page-size="10"
                    :current-page='page2.current'
                    @current-change="handleCurrentChange2"
                    :total="page2.total">
                </el-pagination>
                <el-dialog
                    title="详情"
                    :visible.sync="detailVisible"
                    width="420"
                    >
                    <div class="lists_box" v-if="detailObj&&detailObj.elementCodes">
                        <div class="line">
                            <div class="label">相关元素：</div>
                            <div class="val elements"><el-tag v-for=" k in detailObj.elementCodes.split(',')" :key="k">{{k}}</el-tag></div>
                        </div>
                        <div class="line">
                            <div class="label">文件价格：</div>
                            <div class="val">{{detailObj.price}}</div>
                        </div>
                        <div class="line">
                            <div class="label">文件源：</div>
                            <div class="val"><a :href="detailObj.path" target="_blank">{{detailObj.fileSourceName}}</a></div>
                        </div>
                        <div class="line">
                            <div class="label">预览图：</div>
                            <div class="val">
                                <div class="img_box"><img :src="detailObj.previewPic" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="detailVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="文件下载记录">
                <el-table  :data="tableData" border>
                    <el-table-column
                        label="序号"
                        type="index"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="fileSourceName"
                        label="文件名">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="companyAddress"
                        label="公司地址">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱">
                    </el-table-column>
                    <el-table-column
                        prop="payTypeStr"
                        label="支付方式">
                    </el-table-column>
                    <el-table-column
                        prop="downLoadDate"
                        label="下载时间"
                        :formatter="dateFormat"
                        width="180">
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
            <el-tab-pane label="文件下载统计">
                <el-table  :data="tableData3" border>
                    <el-table-column
                        label="序号"
                        type="index"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="fileSourceName"
                        
                        label="文件名">
                    </el-table-column>

                    <el-table-column
                        prop="downloadNum"
                        label="下载次数"
                        width="150">
                    </el-table-column>
                    
                </el-table>
                <el-pagination
                    layout="prev, pager, next"
                    :page-size="10"
                    :current-page='page3.current'
                    @current-change="handleCurrentChange3"
                    :total="page3.total">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import {apiContextPath,getFilesRecord, getFilesStatistic,getFilesList,changeStatusFile,deleteFile,getFileDetail} from '@/apis/home';
    import fileUpload from './fileUpload';
    import moment from 'moment';
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
                },
                //文件列表
                searchObj:{
                    eles:'',
                    name:''
                },
                tableData2: [],
                page2:{
                    current: 1,
                    total:1
                },
                detailVisible:false,
                detailObj: {},
                tableData3: [],
                page3:{
                    current: 1,
                    total:1
                },
            };
        },
        mounted () {
            this.getData();
            this.getList();
            this.getFilesStatistic();
        },
        methods: {
            getData(i){//文件下载记录
                let obj = {
                    page: i || 1,
                };
                getFilesRecord(obj).then(res =>{
                    const lists = res.items;
                    
                    this.page.total = res.totalCount;
                    this.tableData = lists;
                })
            },
            getFilesStatistic(i){//下载统计
                let obj = {
                    page: i || 1,
                };
                getFilesStatistic(obj).then(res =>{
                    const lists = res.items;
                    
                    this.page3.total = res.totalCount;
                    this.tableData3 = lists;
                })
            },
            getList(i){//文件列表
                let obj = {
                    page: i || 1,
                    fileName: this.searchObj.name,
                    elementCodes: this.searchObj.eles
                };
                getFilesList(obj).then(res =>{
                    const lists = res.items;
                    
                    this.page2.total = res.totalCount;
                    this.tableData2 = lists;
                })
            },
            handleCurrentChange(i){
                this.page.current = i;
                this.getData(i);
            },
            handleCurrentChange2(i){
                this.page2.current = i;
                this.getList(i);
            },
            handleCurrentChange3(i){
                this.page3.current = i;
                this.getFilesStatistic(i);
            },
            dateFormat(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            changeStatus(row){
                const isOpen = row.status?'disable':'enable';
                changeStatusFile(row.id,isOpen).then(res =>{
                    this.$message.success('修改成功');
                    this.getList();
                })
            },
            viewDetail(id){  
                getFileDetail(id).then(res =>{
                    this.detailVisible = true;
                    this.detailObj = res.data;
                })
            },
            remove(id){
                 this.$confirm('确定删除该文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                         deleteFile(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getList();
                        })
                
                    }).catch(() => {
                                            
                    });
            }
            
        },
    };
</script>
<style lang="less">
    .fileManager{
       
    }
    .lists_box{
        .line{
            margin:1px 0 20px;
            display: flex;
            .img_box{
                width:200px;
            }
        }
    }
</style>