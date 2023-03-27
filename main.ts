let avoiding = 0
let IRL = 0
let Irr = 0
function HardLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    basic.pause(100)
}
function HardRight () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    basic.pause(100)
}
function avoid () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
    basic.pause(100)
    HardRight()
    while (avoiding == 1) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
            SoftRight()
        } else {
            SoftLeft()
        }
        if (IRL == 0 || Irr == 0) {
            avoiding = 0
            HardRight()
        }
    }
}
function SoftRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 80)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
}
function SoftLeft () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 80)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        avoiding = 1
        avoid()
    }
    IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    Irr = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (IRL == 0 && Irr == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
    } else if (IRL == 0) {
        SoftLeft()
    } else if (Irr == 0) {
        SoftRight()
    } else {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
    }
})
