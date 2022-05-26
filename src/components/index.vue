<template>
    <div class='home_page'>
        <div class="home_ceil">
            <!-- <div class="logo">长沙锐睿科技有限公司</div> -->
            <div class="user">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">{{userName}}</span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item icon="el-icon-edit" command="updatePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" command="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="home_bot">
            <div class="nav_bar">
                <el-menu
                    default-active="2" router
                    class="el-menu-vertical-demo">
                    <template v-for="list in navList" >
                        <el-submenu :index="list.path" v-if="list.children">
                            <template slot="title">{{list.name}}</template>
                            <el-menu-item :index="item.path" v-for="item in list.children">{{item.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="list.path" v-else>
                            <span slot="title">{{list.name}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>

            </div>
            <div class="home_content">
                <el-scrollbar style="height:100%">
                    <router-view @changeName="resetName"></router-view>
                </el-scrollbar>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="form"  label-width="120px">
                <el-form-item label="旧密码">
                    <el-input v-model="form.pwdOld" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.pwdNew" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" >
                    <el-input v-model="form.pwdNew2" type="password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {storeToken, removeToken} from '@/apis/http';
    import {logout,updatePwd,navList} from '@/apis/home';
    export default {
        data () {
            return {
                navList,
                dialogFormVisible: false,
                form:{
                    pwdOld: '',
                    pwdNew:'',
                    pwdNew2: ''
                },
                userName: sessionStorage.getItem('userName')
            };
        },
        computed: {
            userLimit(){
                return !Number(sessionStorage.getItem('userLimit'));
            }
        },
        mounted () {
        },
        methods: {
            handleCommand(command){
                if(command === 'updatePwd'){
                    this. dialogFormVisible=true;
                    Object.keys(this.form).forEach(k =>{
                        this.form[k] = '';
                    });
                    
                }else{
                    this.$confirm('确定退出系统?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        logout().then(res =>{
                            this.$message.success('退出登录成功');
                            removeToken();
                            this.$router.push('/login');
                        });
                    
                    }).catch(() => {
                                
                    });
                }
            },
            submitPwd(){
                const password = this.form.pwdNew;
                const repeatPassword = this.form.pwdNew2;
                const oldPassword = this.form.pwdOld;
                const userId = sessionStorage.getItem('userId');
                if(password && oldPassword && password === repeatPassword){
                    updatePwd({oldPassword, repeatPassword, password}).then(res =>{
                        this.dialogFormVisible = false;
                        this.$message.success('密码修改成功,请重新登录');
                        this.$router.push('/login');
                    });
                }else{
                    this.$message.warning('请确保两次密码一致');
                }
            },
            resetName(v){
                this.userName =  v;
            }
        },
    };
</script>

<style lang='less' >
@heightHeader:60px;
@widthNav: 200px;
.home_page{
    height: 100vh;
    .home_ceil{
        position: fixed;
        width: 100%;
        top:0;
        left:0;
        height:@heightHeader;
        background-color: rgba(#007ED5, .8);
        .user{
            float:right;
            margin-right:30px;
            line-height: @heightHeader;
            cursor: pointer;
            .el-dropdown{
                color:#fff;
            }
        }
        .logo{
            float:left;
            color:#fff;
            line-height: @heightHeader;
            padding-left: 25px;
            font-size: 22px;
            font-weight: bold;
        }
    }
    .home_bot{
        padding-top: @heightHeader;
        height:100vh;
        box-sizing: border-box;
        overflow: hidden;
        .nav_bar{
            float: left;
            background-color:#eef1f6 ;
            width: @widthNav;
            height: 100%;
            .el-menu{
                background-color:#eef1f6 ;
            }
            .el-menu-item, .el-submenu__title{
                height: 50px;
                line-height: 50px;
            }
            .list{
                line-height: 56px;
                a{
                    display: block;
                    color:#48576a;
                    padding-left: 30px;
                    text-decoration: none;
                    background-color: transparent;
                    transition: all .3s;
                    &:hover{
                        background-color: #d1dbe5;
                    }
                    &.router-link-active{
                        background-color: #d1dbe5;
                    }

                }
            }
        }
        .home_content{
            margin-left: @widthNav;
            padding:21px;
            height: 100%;
        }
    }

}

</style>
<style>
.el-table{
    margin-top: 21px;
}
.el-pagination{
    margin:30px 0 10px;
    text-align: center;
}
</style>