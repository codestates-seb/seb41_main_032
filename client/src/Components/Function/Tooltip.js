import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import Portal from './Portal';

const StyledTooltip = styled.span.attrs((p) => ({
    background: p.background || '#373e47',
    color: p.color || '#eee',
    delay: p.delay || 0.1,
}))`
    position: fixed;
    top: ${(p) => p.posRef.current.y}px;
    left: ${(p) => p.posRef.current.x}px;
    font-size: 1em;
    font-weight: 700px;
    letter-spacing: 0.02em;
    background-color: ${(p) => p.background};
    color: ${(p) => p.color};
    pointer-events: none; //툴팁을 연속으로 사용할 경우 툴팁박스에 가려져 주변에 있는 다른 툴팁기능이 작동안하기 때문에 설정한 값
    padding: 7px 10px;
    border-radius: 4px;
    z-index: 99999;
    display: inline-block;
    white-space: pre-wrap;
    opacity: ${(p) => p.show};

    transition-property: transform, opacity !important;
    transition-duration: 0.1s !important;
    transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 1) !important;
    transition-delay: ${(p) => (p.show ? p.delay : 0.1)}s !important;
    transform: scale(${(p) => (p.show ? 1 : 0.5)});
`;

/** @param {string} placement 툴팁의 위치값 입니다 */
const position = (placement) => ({
    current: placement,
    negate() {
        if (this.current === 'left') return 'right';
        if (this.current === 'right') return 'left';
        if (this.current === 'top') return 'bottom';
        if (this.current === 'bottom') return 'top';
    },
    isHorizontal() {
        return this.current === 'left' || this.current === 'right';
    },
    isVertical() {
        return this.current === 'top' || this.current === 'bottom';
    },
});

const point = () => ({
    x: null,
    y: null,
    reset(p) {
        this.x = p.x;
        this.y = p.y;
    },
    // 화면 밖으로 빠져나간 툴팁을 화면 안으로
    restrictRect(rect) {
        if (this.x < rect.left) this.x = rect.left;
        else if (this.x > rect.right) this.x = rect.right;
        if (this.y < rect.top) this.y = rect.top;
        else if (this.y > rect.bottom) this.y = rect.bottom;
    },
});

/** 툴팁의 위치를 계산해주는 기능입니다 */
const getPoint = (el, tooltip, placement, space) => {
    let recurCount = 0;
    const pt = point();

    /**
     * boundary는 툴팁이 화면에서 벗어나는것을 막아줄 값을 설정합니다
     * 화면의 x와 y좌표는 왼쪽 상단부터 시작(x:0 y:0)하기 때문에
     * right,bottom값은 각각 html의 너비와 높이값을 구한 후 툴팁이 들어갈 공간을 뺍니다
     * 상하는 top값 보다 크고 bottom값 보다 작아야 툴팁이 들어갈 공간이 있는것 입니다
     * 좌우는 left값 보다 크고 right값 보다 작아야 툴팁이 들어갈 공간이 있는것 입니다
     */
    const boundary = {
        left: space,
        top: space,
        right: document.body.clientWidth - (tooltip.clientWidth + space),
        bottom: window.innerHeight - (tooltip.clientHeight + space),
    };

    // getBoundingClientRect = 요소의 위치값을 가져옵니다
    const elRect = el.getBoundingClientRect();

    /**
     * 재귀적으로 툴팁이 화면밖으로 벗어나는지 확인하면서
     * 툴팁이 화면밖으로 벗어난다면 pt.reset(recursive(pos.negate()))를 실행하여
     * 툴팁의 위치값을 반전시킵니다
     * ex) placement이 left값 이였는데 화면밖으로 벗어났다면 placement값을 right로 바꿉니다
     */
    return (function recursive(placement) {
        recurCount++;
        const pos = position(placement);
        switch (pos.current) {
            case 'left':
                pt.x = elRect.left - (tooltip.offsetWidth + space);
                pt.y = elRect.top + (el.offsetHeight - tooltip.offsetHeight) / 2;
                break;
            case 'right':
                pt.x = elRect.right + space;
                pt.y = elRect.top + (el.offsetHeight - tooltip.offsetHeight) / 2;
                break;
            case 'top':
                pt.x = elRect.left + (el.offsetWidth - tooltip.offsetWidth) / 2;
                pt.y = elRect.top - (tooltip.offsetHeight + space);
                break;
            default:
                pt.x = elRect.left + (el.offsetWidth - tooltip.offsetWidth) / 2;
                pt.y = elRect.bottom + space;
        }
        if (recurCount < 3)
            if (
                (pos.isHorizontal() && (pt.x < boundary.left || pt.x > boundary.right)) ||
                (pos.isVertical() && (pt.y < boundary.top || pt.y > boundary.bottom))
            ) {
                // placement값을 반전시킵니다 ex) left => right
                pt.reset(recursive(pos.negate()));
            }

        // 위치를 반전시켜도 툴팁이 화면 밖으로 빠져나가는 경우를 대비
        pt.restrictRect(boundary);

        return pt;
    })(placement);
};

/**
 * 툴팁을 보여주는 기능입니다
 * @author 이중원
 * @param  {string} text 툴팁으로 보여줄 텍스트를 넣어주세요
 * @param  {string} placement 툴팁을 보여줄 위치를 설정해주세요
 * @param  {number} space 툴팁과 요소간의 간격입니다
 * @param  {string} background 툴팁의 background-color 설정 입니다
 * @param  {string} color 툴팁의 color 설정 입니다
 */
function Tooltip({ text, placement = 'bottom', space = 10, background, color, delay, children }) {
    /**
     * 툴팁을 리엑트dom(id='root') 외부에 생성하고 //css 상속을 피하기 위해
     * cloneElement로 자식요소에 마우스이벤트를 추가하여 복사후 대체를 하고
     * Over 이벤트가 발생시 이벤트가 발생한 위치로 툴팁을 이동시킵니다
     * Out 이벤트에는 툴팁의 opacity를 조정하여 안보이게 처리합니다
     * */

    const [show, setShow] = useState(0); // 툴팁을 보여줄지 결정하는 값
    const posRef = useRef({ x: 0, y: 0 }); // 툴팁의 위치를 결정하는 값
    const tooltipRef = useRef();

    const handleMOver = (e) => {
        setShow(1);
        posRef.current = getPoint(e.currentTarget, tooltipRef.current, placement, Number(space));
    };
    const handleMOut = () => setShow(0);

    return (
        <>
            {React.cloneElement(children, {
                onMouseOver: handleMOver,
                onMouseOut: handleMOut,
            })}

            <Portal>
                <StyledTooltip delay={delay} background={background} color={color} ref={tooltipRef} posRef={posRef} show={show}>
                    {text}
                </StyledTooltip>
            </Portal>
        </>
    );
}

export default Tooltip;
