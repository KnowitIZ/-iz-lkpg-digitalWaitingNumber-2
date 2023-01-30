export const Row = (props) => {
  return (
    <tr>
      <td>{props.item.action}</td>
      <td>
        <input
          type="checkbox"
          checked={props.item.done}
          onChange={() => props.callback(props.item)}
        />
      </td>
    </tr>
  );
};
