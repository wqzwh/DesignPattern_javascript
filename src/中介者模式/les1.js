/**
 *
 * 中介者模式
 * 中介者模式的例子——泡泡堂游戏
 * 三个方法： win 、lose以及表示玩家死亡的 die
 * 将玩家增加到8名，以组队的形式对抗
 * 使每个玩家对象都增加一些属性，分别是队友列表、敌人列表 、玩家当前状态、角色名字以及玩家所在的队伍颜色
 *
 */
const state = Symbol('state')
class Player {
  constructor(name, teamColor) {
    this.partners = [] // 队友列表
    this.enemies = [] // 敌人列表
    this[state] = 'live' // 玩家状态
    this.name = name // 角色名字
    this.teamColor = teamColor // 队伍颜色
  }

  win() {
    console.log('winner: ' + this.name)
  }

  lose() {
    console.log('loser: ' + this.name)
  }

  die() {
    let allDead = true
    this[state] = 'dead' // 设置玩家状态为死亡
    for (let i = 0, partner; partner = this.partners[i++];) { // 遍历队友列表
      if (partner[state] !== 'dead') { // 如果还有一个队友没有死亡，则游戏还未失败
        allDead = false
        break
      }
    }
    if (allDead === true) { // 如果队友全部死亡
      this.lose() // 通知自己游戏失败
      for (let i = 0, partner; partner = this.partners[i++];) { // 通知所有队友玩家游戏失败
        partner.lose()
      }
      for (let i = 0, enemy; enemy = this.enemies[i++];) { // 通知所有敌人游戏胜利
        enemy.win()
      }
    }
  }
}

// 定义一个玩家数组
const players = []

// 建立工厂来创建玩家
const playerFactory = function(name, teamColor) {
  const newPlayer = new Player(name, teamColor) // 创建新玩家
  for (let i = 0, player; player = players[i++];) { // 通知所有的玩家，有新角色加入
    if (player.teamColor === newPlayer.teamColor) { // 如果是同一队的玩家
      player.partners.push(newPlayer) // 相互添加到队友列表
      newPlayer.partners.push(player)
    } else {
      player.enemies.push(newPlayer) // 相互添加到敌人列表
      newPlayer.enemies.push(player)
    }
  }
  players.push(newPlayer)
  return newPlayer
}
// 红队：
const player1 = playerFactory('皮蛋', 'red')
const player2 = playerFactory('小乖', 'red')
const player3 = playerFactory('宝宝', 'red')
const player4 = playerFactory('小强', 'red')
// 蓝队：
const player5 = playerFactory('黑妞', 'blue')
const player6 = playerFactory('葱头', 'blue')
const player7 = playerFactory('胖墩', 'blue')
const player8 = playerFactory('海盗', 'blue')

player1.die()
player2.die()
player4.die()
player3.die()
