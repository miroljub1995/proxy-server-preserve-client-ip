import { ResponsivePie } from '@nivo/pie'
import React, { useState, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import './ViewsButton.scss'
import { useViewsByPostId } from '../api/viewsHooks'

export default ({ post_id }: { post_id: string }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const views = useViewsByPostId(post_id)
  const viewsForPie = useMemo(() => views.map(e => ({ id: e._id, label: e._id, value: e.value })), [views])
  const totalViews = useMemo(() => views.reduce((p, c) => p + c.value, 0), [views])

  return (
    <>
      <i data-toggle="tooltip" title="Show views" onClick={() => setModalOpen(true)}>
        <i className="fas fa-2x mx-2 fa-chart-pie text-primary"></i>
      </i>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Views in total: {totalViews}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="views-modal">
          <ResponsivePie
            data={viewsForPie}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}