<template>
    <div class='banner_page'>
         <el-button type="primary" plain @click="addUser">新增</el-button>
         <el-table  :data="tableData" border >
             <el-table-column
                label="序号"
                type="index"
                width="80">
            </el-table-column>
            <el-table-column
                prop="loginName"
                label="账号"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="昵称"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="角色"
                width="210">
                <template slot-scope="scope">
                    <span >{{ scope.row.roleId?'新闻管理员': '系统管理员' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                width="300"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="publish(scope.row)" type="text" size="small">{{scope.row.status?'禁用':'启用'}}</el-button>
                    <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="resetPwd(scope.row)" type="text" size="small">重置密码</el-button>
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
        <el-dialog :title="updateId?'修改用户':'新添用户'" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
            <el-form :model="form"  label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.loginName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号权限" prop="resource">
                    <el-radio-group v-model="form.roleId">
                        <el-radio :label="0">系统管理员</el-radio>
                        <el-radio :label="1">新闻管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="密码" v-if="!updateId">
                    <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复密码"  v-if="!updateId">
                    <el-input v-model="form.repeatPassword" type="password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="dialogFormVisible2">
            <el-form :model="formPwd"  label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="formPwd.loginName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="formPwd.name" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formPwd.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复密码">
                    <el-input v-model="formPwd.repeatPassword" type="password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitPwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAllUser,publishUser, saveUser, updateUser, deleteUser, resetPwd} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                currentPage:1,
                formLabelWidth: 100,
                form:{
                    loginName: '',
                    roleId: 0,
                    name: '',
                    repeatPassword: '',
                    password: ''
                },
                dialogFormVisible: false,
                dialogFormVisible2: false,
                isResetPwd: 0,
                page:{
                    current: 1,
                    total:1
                },
                updateId: 0,
                formPwd: {
                    loginName: '',
                    name: '',
                    password: '',
                    repeatPassword: ''
                }
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(i){
                const page = i || 1;
                getAllUser({page:page}).then(res =>{
                    const lists = res.items;
                    
                    this.page.total = res.totalCount;
                    this.tableData = lists;
                });
            },
            handleCurrentChange(i){
                this.getData(i);
            },
            modify(row){
                this.dialogFormVisible = true;
                for(let k in this.form){
                    this.form[k] = row[k];
                }
                this.updateId = row.id;
            },
            publish(row){
                const state = row.status?0:1 ;
                const word = row.status?'禁用':'启用';
                this.$confirm('确定'+word+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        publishUser(row.id,state).then(res =>{
                            this.getData(this.page.current);
                        });
                    }).catch(() => {            
                    });
                
            },
            remove(id){
                this.$confirm('确定删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteUser(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    
                    }).catch(() => {
                                
                    });
            },
            addUser(){
                this.dialogFormVisible = true;
                this.updateId = 0;
                for(let k in this.form){
                    this.form[k] = '';
                }
                this.form.roleId = 0;
            },
            submitUser(){
                if(this.updateId){//修改
                    const obj ={
                        loginName: this.form.loginName,
                        roleId: this.form.roleId,
                        name: this.form.name,
                        id: this.updateId
                    }
                    updateUser(obj).then(res =>{
                        this.dialogFormVisible = false;
                        this.$message.success('修改成功');
                        this.getData();
                        for(let k in this.form){
                            this.form[k] = '';
                        }
                        this.form.roleId = 0;
                    });
                }else{
                    saveUser(this.form).then(res =>{
                        this.dialogFormVisible = false;
                        this.$message.success('新添成功');
                        this.getData();
                        for(let k in this.form){
                            this.form[k] = '';
                        }
                        this.form.roleId = 0;
                    });
                }
                
            },
            cancelUpdate(){
                this.dialogFormVisible2 = false;
                this.isResetPwd = 0;
            },
            resetPwd(row){  
               this.formPwd.loginName =  row.loginName;
                this.formPwd.name =  row.name;
                this.formPwd.password =  '';
                this.formPwd.repeatPassword =  '';
                this.dialogFormVisible2 = true;
                this.resetPwdId = row.id;
            },
            submitPwd(){
                if(this.formPwd.password && this.formPwd.repeatPassword){
                    const obj ={
                        id: this.resetPwdId,
                        password: this.formPwd.password,
                        repeatPassword: this.formPwd.repeatPassword,
                    }
                    resetPwd(obj).then(res =>{
                        this.$message.success('密码重置成功');
                        this.dialogFormVisible2 = false;
                    })
                }else{
                    this.$message.success('密码和重复密码不能为空');
                }
            }

        },
    };
</script>

<style lang='less' scoped>

</style>