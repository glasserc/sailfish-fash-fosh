import QtQuick 2.0
import Sailfish.Silica 1.0
import "tictactoemodel.js" as TTTM
Item {
    property string state: "";
    Label {
        id: label
        text: parent.state
        anchors.centerIn: parent
    }
}
