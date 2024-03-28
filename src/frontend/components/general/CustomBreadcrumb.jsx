/* eslint-disable react/prop-types */
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { v4 as uuidv4} from 'uuid'

export default function CustomBreadcrumb(props) {
  const {data} = props
  return (
    <Breadcrumbs>
      {
        data.map(each => {
          return (<BreadcrumbItem key={uuidv4()}>{each.title}</BreadcrumbItem>)
        })
      }
    </Breadcrumbs>
  );
}
