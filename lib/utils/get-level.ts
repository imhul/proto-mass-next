export const getLevel = (level: number, points: number) => {
    switch (level) {
        case 0:
            return {
                level: points === 1000 || points > 1000 ? level + 1 : level,
                pointsToNextLevel: 1000 - points,
                levelName: 'trainee'
            }
        case 1:
            return {
                level: points === 1200 || points > 1200 ? level + 1 : level,
                pointsToNextLevel: 1200 - points,
                levelName: 'trainee'
            }
        case 2:
            return {
                level: points === 1440 || points > 1440 ? level + 1 : level,
                pointsToNextLevel: 1440 - points,
                levelName: 'trainee'
            }
        case 3:
            return {
                level: points === 1728 || points > 1728 ? level + 1 : level,
                pointsToNextLevel: 1728 - points,
                levelName: 'trainee'
            }
        case 4:
            return {
                level: points === 2073 || points > 2073 ? level + 1 : level,
                pointsToNextLevel: 2073 - points,
                levelName: 'trainee'
            }
        case 5:
            return {
                level: points === 2488 || points > 2488 ? level + 1 : level,
                pointsToNextLevel: 2488 - points,
                levelName: 'trainee'
            }
        case 6:
            return {
                level: points === 2985 || points > 2985 ? level + 1 : level,
                pointsToNextLevel: 2985 - points,
                levelName: 'medium'
            }
        case 7:
            return {
                level: points === 3583 || points > 3583 ? level + 1 : level,
                pointsToNextLevel: 3583 - points,
                levelName: 'medium'
            }
        case 8:
            return {
                level: points === 4299 || points > 4299 ? level + 1 : level,
                pointsToNextLevel: 4299 - points,
                levelName: 'medium'
            }
        case 9:
            return {
                level: points === 5159 || points > 5159 ? level + 1 : level,
                pointsToNextLevel: 5159 - points,
                levelName: 'medium'
            }
        case 10:
            return {
                level: points === 6191 || points > 6191 ? level + 1 : level,
                pointsToNextLevel: 6191 - points,
                levelName: 'medium'
            }
        case 11:
            return {
                level: points === 7430 || points > 7430 ? level + 1 : level,
                pointsToNextLevel: 7430 - points,
                levelName: 'master'
            }
        case 12:
            return {
                level: points === 8916 || points > 8916 ? level + 1 : level,
                pointsToNextLevel: 8916 - points,
                levelName: 'master'
            }
        case 13:
            return {
                level: points === 10699 || points > 10699 ? level + 1 : level,
                pointsToNextLevel: 10699 - points,
                levelName: 'master'
            }
        case 14:
            return {
                level: points === 12839 || points > 12839 ? level + 1 : level,
                pointsToNextLevel: 12839 - points,
                levelName: 'master'
            }
        case 15:
            return {
                level: points === 15407 || points > 15407 ? level + 1 : level,
                pointsToNextLevel: 15407 - points,
                levelName: 'master'
            }
        case 16:
            return {
                level: points === 18488 || points > 18488 ? level + 1 : level,
                pointsToNextLevel: 18488 - points,
                levelName: 'prime'
            }
        case 17:
            return {
                level: points === 22186 || points > 22186 ? level + 1 : level,
                pointsToNextLevel: 22186 - points,
                levelName: 'prime'
            }
        case 18:
            return {
                level: points === 26623 || points > 26623 ? level + 1 : level,
                pointsToNextLevel: 26623 - points,
                levelName: 'prime'
            }
        case 19:
            return {
                level: points === 31947 || points > 31947 ? level + 1 : level,
                pointsToNextLevel: 31947 - points,
                levelName: 'prime'
            }
        case 20:
            return {
                level: 20,
                pointsToNextLevel: 0,
                levelName: 'prime'
            }
        default:
            break
    }
}
