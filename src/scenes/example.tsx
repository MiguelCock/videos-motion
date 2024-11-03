import {makeScene2D, Code, replace, Circle} from '@motion-canvas/2d';
import {all, createRef, DEFAULT, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  let num = 1;

  const code = createRef<Code>();
  view.add(
    <Code
      ref={code}
      fontSize={28}
      fontFamily={'JetBrains Mono, monospace'}
      offsetX={-1}
      x={-600}
      code={`let radius = ${num};`}
    />,
  );

  const myCircle = createRef<Circle>();
  view.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      x={400}
      width={num}
      height={num}
      fill="#e13238"
    />,
  );

  for(let i = 0; i < 999; i++) {
    yield* all(
      code().code.edit(0.01)`let radius = ${replace(String(num), String(num+=1))};`,
      myCircle().scale(num, 0.01)
    )
  }

  yield* waitFor(0.6);
});
