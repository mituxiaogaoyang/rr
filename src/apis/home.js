
import apiService from './http';
export const apiContextPath = '/ct'; //
const pageSize = 10;
export const navList= [
    {
        name: '首页管理',
        path: '/banner',
    },
    {
        name: '公司产品',
        path: 'banner',
        children: [
            {
                name: 'CALTPP软件',
                path: '/appDetail?type=1',
            },{
                name: '相场软件',
                path: '/appDetail?type=2',
            },{
                name: '其他软件',
                path: '/otherApp?type=3',
            },{
                name: '国外软件',
                path: '/otherApp?type=4',
            },{
                name: '其他产品',
                path: '/otherApp?type=5',
            },

        ]
    },{
        name: '走进锐睿',
        path: '/inRuirui',
    },{
        name: '新闻中心',
        path: '/news',
    },{
        name: '人才招聘',
        path: '/job',
    },{
        name: '服务提供',
        path: '/job',
        children: [
            {
                name: '会议服务',
                path: '/metting',
            },{
                name: '培训服务',
                path: '/train',
            },{
                name: '材料研究及咨询',
                path: 'caltpp',
            }
        ]
    },{
        name: '文件管理',
        path: '/fileManager',
    },{
        name: '联系我们',
        path: '/contact',
    },{
        name: '用户管理',
        path: '/user',
    }
]
//logout
export function logout() {
    return apiService.get(apiContextPath + '/logout');
}
//user
export function getAllUser(data) {
    return apiService.get(apiContextPath + '/admin/query',{...data,pageSize});
}
export function publishUser(id,state){
    const url = state?'/admin/enable':'/admin/disable';
    return apiService.post(apiContextPath + url,{id});
}
export function saveUser(data) {
    return apiService.post(apiContextPath + '/admin/save',data);
}
export function updateUser(data) {
    return apiService.post(apiContextPath + '/admin/update',data);
}
export function deleteUser(id){
    return apiService.post(apiContextPath + '/admin/del',{id});
}
export function updatePwd(data) {
    return apiService.post(apiContextPath + '/admin/update/pwd',data);
}
export function resetPwd(data){
    return apiService.post(apiContextPath + '/admin/reset/pwd',data);
}
//news
export const states = [
    {label:'未发布',val:0},
    {label:'已发布',val:1},
];
export function getNews(data){
    return apiService.get(apiContextPath + '/mgnews/query',{...data,pageSize});
}
export const imgSite = apiContextPath + '/console/file/upload' ; //图片上传地址
export function addNews(data){
    return apiService.post(apiContextPath + '/mgnews/save',data);
}
export function updateNews(data){
    return apiService.post(apiContextPath + '/mgnews/update',data);
}
export function publishNews(id,state){
    const url = state?'/mgnews/enable':'/mgnews/disable';
    return apiService.post(apiContextPath + url,{id});
}
export function getNewsInfo(id){
    return apiService.get(apiContextPath + '/mgnews/get',{id});
}
export function deleteNews(id){
    return apiService.post(apiContextPath + '/mgnews/del',{id});
}
// 留言
export const statesMessage = [
    {label:'未处理',val:0},
    {label:'已处理',val:1},
    {label:'无需处理',val:2},
];
export function getMessages(data){
    return apiService.post(apiContextPath + '/console/comments/queryList',{...data,pageSize});
}
export function dealMessages(id,dealState){
    return apiService.post(apiContextPath + '/console/comments/deal',{id,dealState});
}
//banner

//招聘
export function getJobs(data){
    return apiService.get(apiContextPath + '/recruitment/query',{...data,pageSize});
}
export function addJob(data){
    return apiService.post(apiContextPath + '/recruitment/save',data);
}
export function publishJob(id,state){
    const url = state?'/recruitment/enable':'/recruitment/disable';
    return apiService.post(apiContextPath + url,{id});
}
export function deleteJob(id){
    return apiService.post(apiContextPath + '/recruitment/del',{id});
}
export function getJobInfo(id){
    return apiService.get(apiContextPath + '/recruitment/get',{id});
}
export function updateJob(data){
    return apiService.post(apiContextPath + '/recruitment/update',data);
}
//inRuirui
export function getEvents(){
    return apiService.get(apiContextPath + '/rrkj/big/event/get');
}
export function setEvents(content){
    return apiService.post(apiContextPath + '/rrkj/big/event/edit',{content});
}
export function getCulture(){
    return apiService.get(apiContextPath + '/rrkj/company/culture/get');
}
export function setCulture(content){
    return apiService.post(apiContextPath + '/rrkj/company/culture/edit',{content});
}
export function getSituation(){
    return apiService.get(apiContextPath + '/rrkj/company/overview/get');
}
export function setSituation(content){
    return apiService.post(apiContextPath + '/rrkj/company/overview/edit',{content});
}
export function getIp(){
    return apiService.get(apiContextPath + '/rrkj/intellectual/property/get');
}
export function setIp(content){
    return apiService.post(apiContextPath + '/rrkj/intellectual/property/edit',{content});
}
//contact
export function getContact(){
    return apiService.get(apiContextPath + '/contact/us/get');
}
export function setContact(data){
    return apiService.post(apiContextPath + '/contact/us/edit',data);
}
//caltpp
export function getAdv(){
    return apiService.get(apiContextPath + '/caltpp/advantage/feature/get');
}
export function setAdv(content){
    return apiService.post(apiContextPath + '/caltpp/advantage/feature/edit',{content});
}
export function getCore(){
    return apiService.get(apiContextPath + '/caltpp/core/function/get');
}
export function setCore(content){
    return apiService.post(apiContextPath + '/caltpp/core/function/edit',{content});
}
export function getBuy(){
    return apiService.get(apiContextPath + '/caltpp/purchasing/process/get');
}
export function setBuy(content){
    return apiService.post(apiContextPath + '/caltpp/purchasing/process/edit',{content});
}
export function getSoft(){
    return apiService.get(apiContextPath + '/caltpp/soft/description/get');
}
export function setSoft(content){
    return apiService.post(apiContextPath + '/caltpp/soft/description/edit',{content});
}
//meeting
export function getMeetingAdv(){
    return apiService.get(apiContextPath + '/meeting/advantage/feature/get');
}
export function setMeetingAdv(content){
    return apiService.post(apiContextPath + '/meeting/advantage/feature/edit',{content});
}
export function getMeetingContact(){
    return apiService.get(apiContextPath + '/meeting/contact/method/get');
}
export function setMeetingContact(content){
    return apiService.post(apiContextPath + '/meeting/contact/method/edit',{content});
}
export function getMeetingSponsor(){
    return apiService.get(apiContextPath + '/meeting/contact/sponsor/get');
}
export function setMeetingSponsor(content){
    return apiService.post(apiContextPath + '/meeting/contact/sponsor/edit',{content});
}
export function getMeetingNotice(){
    return apiService.get(apiContextPath + '/meeting/notice/get');
}
export function setMeetingNotice(content){
    return apiService.post(apiContextPath + '/meeting/notice/edit',{content});
}
export function getMeetingUndertake(){
    return apiService.get(apiContextPath + '/meeting/undertake/meeting/get');
}
export function setMeetingUndertake(content){
    return apiService.post(apiContextPath + '/meeting/undertake/meeting/edit',{content});
}
//index
export function getCompanyInfo(){
    return apiService.get(apiContextPath + '/company/info');
}
export function setCompanyWord(introduce){
    return apiService.get(apiContextPath + '/company/introduce/edit',{introduce});
}
export function setCompanyProduct(product){
    return apiService.get(apiContextPath + '/company/product/edit',{product});
}
export function setCompanyService(service){
    return apiService.get(apiContextPath + '/company/service/edit',{service});
}
export function setBannerImg(guidepic){
    return apiService.get(apiContextPath + '/company/guidepic/edit',{guidepic});
}
//train
export function getTrainAdv(){
    return apiService.get(apiContextPath + '/train/advantage/feature/get');
}
export function setTrainAdv(content){
    return apiService.post(apiContextPath + '/train/advantage/feature/edit',{content});
}
export function getTrainContact(){
    return apiService.get(apiContextPath + '/train/contact/method/get');
}
export function setTrainContact(content){
    return apiService.post(apiContextPath + '/train/contact/method/edit',{content});
}
export function getTrainSponsor(){
    return apiService.get(apiContextPath + '/train/contact/sponsor/get');
}
export function setTrainSponsor(content){
    return apiService.post(apiContextPath + '/train/contact/sponsor/edit',{content});
}
export function getTrainNotice(){
    return apiService.get(apiContextPath + '/train/notice/get');
}
export function setTrainNotice(content){
    return apiService.post(apiContextPath + '/train/notice/edit',{content});
}
export function getTrainService(){
    return apiService.get(apiContextPath + '/train/service/content/get');
}
export function setTrainService(content){
    return apiService.post(apiContextPath + '/train/service/content/edit',{content});
}
//file
export function getFilesRecord(data){
    return apiService.get(apiContextPath + '/fileDownload/record/query',{...data,pageSize});
}
export function addFile(data){
    return apiService.post(apiContextPath + '/fileElement/save',data);
}
//index 
export function getBannerList(){
    return apiService.get(apiContextPath + '/index/query');
}
export function getBannerDetail(id) {
    return apiService.get(apiContextPath + '/index/get',{id});
}
export function setBannerItem(content){
    return apiService.post(apiContextPath + '/index/save', content);
}
export function updateBannerItem(content) {
    return apiService.post(apiContextPath + '/index/update', content);
}
export function deleteBanner(id){
    return apiService.post(apiContextPath + '/index/del',{id});
}
//分页查询产品
export function getAppList(params){
    return apiService.get(apiContextPath + '/product/query',params);
}
export function addApp(data){
    return apiService.post(apiContextPath + '/product/save',data);
}
export function updateApp(data){
    return apiService.post(apiContextPath + '/product/update',data);
}
export function getAppDetail(id){
    return apiService.get(apiContextPath + '/product/get',{id});
}
export function getCaltpp() {
    return apiService.get(apiContextPath + '/product/caltpp/get');
}
export function getAppXC() {
    return apiService.get(apiContextPath + '/product/xc/get');
}
//服务
export const statesService = [
    { label: '禁用', val: 0 },
    { label: '启用', val: 1 },
];
export function getTrainNotices(data) {
    return apiService.get(apiContextPath + '/train/notice/query', { ...data, pageSize });
}
export function getMeetingNotices(data) {
    return apiService.get(apiContextPath + '/meeting/notice/query', { ...data, pageSize });
}
export function addNotice(data,type) {
    // type: meeting train 
    return apiService.post(apiContextPath +'/'+ type + '/notice/save', data);
}
export function updateNotice(data, type) {
    // type: meeting train 
    return apiService.post(apiContextPath + '/' + type + '/notice/update', data);
}
export function changeStatus(id, type,isOpen) {//改变状态
    // type: meeting train  isOpen:enable disable
    return apiService.post(apiContextPath +'/'+ type +'/notice/'+isOpen, {id});
}
export function deleteNotice(id, type) {
    // type: meeting train 
    let url;
    if (type === 'meeting'){
        url = '/meeting/notice/del'
    }else{
        url = '/train/del'
    }
    return apiService.post(apiContextPath + url, {id});
}
export function getNoticeDetail(id,type) {
    return apiService.get(apiContextPath +'/'+ type + '/notice/get',{id});
}
