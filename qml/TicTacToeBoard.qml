import QtQuick 2.0

// No good way to draw lines. See https://developer.nokia.com/Community/Wiki/Drawing_lines_in_QML
Item {
    anchors.fill: parent
    property int blockSize: parent.blockSize
    property int boardLineWidth: parent.boardLineWidth
    Rectangle {
        color: Theme.secondaryColor
        width: parent.boardLineWidth
        height: parent.height
        x: parent.blockSize
    }
    Rectangle {
        color: Theme.secondaryColor
        width: parent.boardLineWidth
        height: parent.height
        x: 2*parent.blockSize + parent.boardLineWidth
    }
    Rectangle {
        color: Theme.secondaryColor
        height: parent.boardLineWidth
        width: parent.width
        y: parent.blockSize
    }
    Rectangle {
        color: Theme.secondaryColor
        height: parent.boardLineWidth
        width: parent.width
        y: 2*parent.blockSize + parent.boardLineWidth
    }
}
