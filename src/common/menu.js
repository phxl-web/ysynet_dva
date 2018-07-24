const menu = [{
  "path": "/ysy",
  "subMenus": [{
    "path": "/ysy/menu",
    "level": 1,
    "fsort": 30101,
    "name": "菜单管理",
    "id": "30101",
    "key": "/ysy/menu",
    "parentId": "m301"
  }, {
    "path": "/ysy/subSystem",
    "level": 1,
    "fsort": 30102,
    "name": "子系统管理",
    "id": "30102",
    "key": "/ysy/subSystem",
    "parentId": "m301"
  }, {
    "path": "/ysy/arrange",
    "level": 1,
    "fsort": 30103,
    "name": "部署管理",
    "id": "30103",
    "key": "/ysy/arrange",
    "parentId": "m301"
  }, {
    "path": "/ysy/accredit",
    "level": 1,
    "fsort": 30104,
    "name": "授权管理",
    "id": "30104",
    "key": "/ysy/accredit",
    "parentId": "m301"
  }, {
    "path": "/ysy/managerMgt",
    "level": 1,
    "fsort": 30105,
    "name": "管理员管理",
    "id": "30105",
    "key": "/ysy/managerMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "医商云",
  "icon": "home",
  "id": "m301",
  "key": "/ysy",
  "parentId": "m3"
},
{
  "path":"/dictionary",
  "subMenus": [{
    "path": "/dictionary/dictionaryMgt",
    "level": 1,
    "fsort": 30101,
    "name": "数据字典",
    "id": "30101",
    "key": "/dictionary/dictionaryMgt",
    "parentId": "m301"
  },
  {
    "path": "/dictionary/classifyMgt",
    "level": 1,
    "fsort": 30101,
    "name": "分类管理",
    "id": "30101",
    "key": "/dictionary/classifyMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "字典管理",
  "icon": "table",
  "id": "m301",
  "key": "/dictionary",
  "parentId": "m3"
}, {
  "path": "/configure",
  "subMenus": [{
    "path": "/configure/subSystemConfigure",
    "level": 1,
    "fsort": 30101,
    "name": "子系统配置",
    "id": "30101",
    "key": "/configure/subSystemConfigure",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "配置管理",
  "icon": "table",
  "id": "m301",
  "key": "/configure",
  "parentId": "m3"
}, {
  "path": "/jxh",
  "subMenus": [{
    "path": "/jxh/subSystemMgt",
    "level": 1,
    "fsort": 30101,
    "name": "子系统管理",
    "id": "30101",
    "key": "/jxh/subSystemMgt",
    "parentId": "m301"
  }, {
    "path": "/jxh/subSystemMgter",
    "level": 1,
    "fsort": 30101,
    "name": "子系统管理员",
    "id": "30101",
    "key": "/jxh/subSystemMgter",
    "parentId": "m301"
  }, {
    "path": "/jxh/dpetMgt",
    "level": 1,
    "fsort": 30101,
    "name": "科室管理",
    "id": "30101",
    "key": "/jxh/dpetMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "管理员",
  "icon": "table",
  "id": "m301",
  "key": "/jxh",
  "parentId": "m3"
}, {
  "path": "/manager/lcksSubSystem",
  "subMenus": [{
    "path": "/lcksSubSystem/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/lcksSubSystem/configMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "临床科室子系统",
  "icon": "table",
  "id": "m301",
  "key": "/manager/lcksSubSystem",
  "parentId": "m3"
}, {
  "path": "/manager/flcksSubSystem",
  "subMenus": [{
    "path": "/flcksSubSystem/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/flcksSubSystem/configMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "非临床科室子系统",
  "icon": "table",
  "id": "m301",
  "key": "/manager/flcksSubSystem",
  "parentId": "m3"
}, {
  "path": "jxh/drugStorage",
  "subMenus": [{
    "path": "/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/configMgt",
    "parentId": "m301"
  },{
    "path": "/drugStorageManage",
    "level": 1,
    "fsort": 30102,
    "name": "药库管理",
    "id": "30101",
    "key": "/drugStorageManage",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "药库",
  "icon": "table",
  "id": "m301",
  "key": "jxh/drugStorage",
  "parentId": "m3"
}, 
{
  "path": "/pharmacy",
  "subMenus": [{
    "path": "jxh/pharmacy/configMgt",
    "level": 1,
    "fsort": 30101,
    "name": "配置管理",
    "id": "30101",
    "key": "/configMgt",
    "parentId": "m301"
  }],
  "level": 0,
  "fsort": 301,
  "name": "药房",
  "icon": "table",
  "id": "m301",
  "key": "jxh/pharmacy",
  "parentId": "m3"
}]

export default menu ; 