import * as React from 'react'
import { Message } from '@kodiak-ui/message'
import { SvgIcon } from '@kodiak-ui/primitives'

export default { title: 'Message' }

export function Initial() {
  return <Message>Testing a message</Message>
}

export function Warning() {
  return <Message variant="warning">A warning message</Message>
}

export function Danger() {
  return <Message variant="danger">A danger message</Message>
}

export function MultiLine() {
  return (
    <Message>
      This is a static, default alert with two lines of text. Copy should never
      extend past two lines for readability.
    </Message>
  )
}

export function IconMessage() {
  return (
    <Message>
      <SvgIcon
        viewBox="0 0 16 16"
        width="24px"
        height="24px"
        mr={4}
        color="blue.3"
      >
        <path d="M11.655 6.061a.15.15 0 00-.146.112l-2.058 7.42a.155.155 0 00.081.178.15.15 0 00.19-.049l5.248-7.415a.155.155 0 00-.121-.245l-3.194-.001zM10.54 6.256a.155.155 0 00-.079-.179.15.15 0 00-.067-.016h-4.79a.15.15 0 00-.12.06.154.154 0 00-.026.135l2.394 8.631A.154.154 0 008 15a.151.151 0 00.146-.113l2.395-8.631zM9.784 5.141a.15.15 0 00.128-.071.154.154 0 00.009-.148l-1.817-3.85A.118.118 0 008 1.002a.115.115 0 00-.105.068L6.077 4.922a.155.155 0 00.064.2.15.15 0 00.073.02h3.57zM6.276 13.72a.152.152 0 00.27-.13L4.488 6.173a.153.153 0 00-.145-.112H1.15a.151.151 0 00-.135.085.155.155 0 00.014.16l5.246 7.414zM11.85 4.947a.154.154 0 00.078.179.15.15 0 00.068.015h2.84a.15.15 0 00.136-.085.154.154 0 00-.014-.16l-2.061-2.808a.152.152 0 00-.15-.06.152.152 0 00-.118.11l-.78 2.809zM4.003 5.141a.15.15 0 00.12-.06.153.153 0 00.025-.134l-.779-2.81a.154.154 0 00-.118-.109.15.15 0 00-.15.06l-2.062 2.81a.154.154 0 00.121.245l2.843-.002zM4.97 4.501a.154.154 0 00.134.11.151.151 0 00.15-.085l1.558-3.304a.155.155 0 00-.063-.2.15.15 0 00-.073-.02H4.199a.154.154 0 00-.122.062.155.155 0 00-.022.131l.916 3.306zM10.743 4.526a.152.152 0 00.15.087.151.151 0 00.134-.112l.916-3.306a.155.155 0 00-.077-.178A.15.15 0 0011.8 1H9.322a.15.15 0 00-.128.072.154.154 0 00-.009.148l1.558 3.306z" />
      </SvgIcon>
      Default message with icon
    </Message>
  )
}

export function Dismissible() {
  return (
    <Message onDismiss={() => alert('Dismissing')}>
      Testing a dismissible message
    </Message>
  )
}

export function MultiLineDismissible() {
  return (
    <Message onDismiss={() => alert('Dismissing')}>
      This is a static, default alert with two lines of text. Copy should never
      extend past two lines for readability.
    </Message>
  )
}
