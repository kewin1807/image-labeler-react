import * as React from 'react';
import 'antd/lib/button/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/select/style/css';
interface Props {
    imageUrl: string;
    height: number;
    width: number;
    types: Array<string>;
    asyncUpload?: (data: any) => Promise<any>;
    disableAnnotation?: boolean;
    defaultType?: string;
    defaultSceneType?: string;
    defaultBoxes?: Array<BoundingBox>;
    showButton?: boolean;
    sceneTypes?: Array<string>;
    className?: string;
    style?: any;
}
interface State {
    isAnnotating: boolean;
    showAnnotation: boolean;
    annotation: string;
    hover: boolean;
    mouse_down: boolean;
    uploadIcon: 'upload' | 'check' | 'loading' | 'close';
    lock: boolean;
    uploaded: boolean;
    x: number;
    y: number;
    sceneType: string;
    hoverEdge?: string;
    isMovingBox: boolean;
}
interface BoundingBox {
    x: number;
    y: number;
    w: number;
    h: number;
    annotation: string;
}
declare class Box {
    x: number;
    y: number;
    w: number;
    h: number;
    hover: boolean;
    chosen: boolean;
    lock: boolean;
    annotation: string;
    constructor(x: number, y: number, w: number, h: number);
    insideBox(x: number, y: number): boolean;
    insideInnerBox(x: number, y: number): boolean;
    getEdgeCursorIsOn(x: number, y: number): string | undefined;
    getData(): BoundingBox;
    static fromBoundingBox(data: BoundingBox): Box;
    moveBoxByDrag(xMovement: number, yMovement: number): void;
    resizeByDrag(edge: string | undefined, xMovement: number, yMovement: number): void;
}
export declare class Annotator extends React.Component<Props, State> {
    private readonly imageCanvas;
    private readonly image;
    private canvas?;
    private ctx?;
    private lastZoomScale?;
    private lastX?;
    private lastY?;
    private position;
    private scale;
    private startX;
    private startY;
    private dragX?;
    private dragY?;
    private annotatingBox;
    private chosenBox;
    private isDrawing;
    private boxes;
    private bg;
    private events;
    private nextDefaultType?;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    registerEvent: (element: Element | Window, event: string, listener: EventListener) => void;
    removeEvents: () => void;
    switchMode: () => void;
    setEventListeners: () => void;
    onWheel: (e: WheelEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    searchChosenBox: () => Box | undefined;
    chooseBox: (box: Box, showAnnotation?: boolean) => void;
    refreshBoxTipPosition: () => void;
    cancelChosenBox: () => void;
    getCurrentCoordinate(box: Box): {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    mouseHoverCheck(mouseX: number, mouseY: number): void;
    invertTransform(x: number, y: number): {
        x: number;
        y: number;
    };
    getOriginalXY(pageX: number, pageY: number): number[];
    moveSmallDistance(pageX: number, pageY: number): boolean;
    gesturePinchZoom: (event: TouchEvent) => number;
    doZoom: (zoom: number, x?: number | null, y?: number | null) => void;
    doMove: (relativeX: number, relativeY: number) => void;
    annotateMove: (relativeX: number, relativeY: number) => void;
    dragMove: (relativeX: number, relativeY: number) => void;
    draw: (timestamp?: number | null) => void;
    initCanvas: (url: string) => void;
    getPostData: () => {
        image: string;
        height: number;
        width: number;
        boxes: BoundingBox[];
    };
    onUpload: () => void;
    onDelete: () => void;
    drawLabelEnd: () => void
    render(): JSX.Element;
}
export {};
