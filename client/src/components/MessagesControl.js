import sendIcon from "../assets/send.png";
import attachment from "../assets/paper-clip.png";
import cancel from "../assets/cancel.png";
import image from "../assets/image.png";

const MessagesControl = (props) => {
	const { sendMessage, value, onChange, groupMessage, sortNames, username, receiver, setMedia, onChatClose, media } =
		props;

	const messages = groupMessage ? groupMessage[sortNames(username, receiver)] : [];

	return (
		<div>
			<div className="online-users-header">
				<div style={{ margin: "0 10px" }}>{receiver}</div>
				<div style={{ margin: "0 10px", cursor: "pointer" }}>
					<img onClick={onChatClose} width={10} src={cancel} alt="close" />
				</div>
			</div>
			<div className="message-area">
				<ul>
					{messages && messages.length > 0
						? messages.map((msg, index) => (
								<li
									style={{
										flexDirection: username === msg.receiver ? "row" : "row-reverse",
									}}
									key={index}
								>
									<div className="user-pic">
										<img src={require(`../users/${msg.avatar}`).default} alt={""} />
									</div>
									<div>
										{msg.media && msg.media.image ? (
											<div className="image-container">
												<img src={msg.media.content} width="200" alt={""} />
												{msg.view === true ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														style={{ margin: "0px 3px 0px 3px" }}
														viewBox="0 0 16 15"
														width="11"
														height="10"
													>
														<path
															fill="currentColor"
															d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
														></path>
													</svg>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 16 15"
														style={{ margin: "0px 3px 0px 3px" }}
														width="11"
														height="10"
													>
														<path
															fill="currentColor"
															d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
														></path>
													</svg>
												)}
											</div>
										) : null}
										{msg.message !== "" ? (
											<div className="message-text">
												{msg.message}
												{msg.view === true ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														style={{ margin: "0px 3px 0px 3px" }}
														viewBox="0 0 16 15"
														width="11"
														height="10"
													>
														<path
															fill="currentColor"
															d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
														></path>
													</svg>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 16 15"
														style={{ margin: "0px 3px 0px 3px" }}
														width="11"
														height="10"
													>
														<path
															fill="currentColor"
															d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
														></path>
													</svg>
												)}
											</div>
										) : null}
									</div>
								</li>
						  ))
						: null}
				</ul>
			</div>
			<div>
				{media !== null ? (
					<div className="attachement-display">
						<img src={image} alt={""} />
						<span className="attachment-name">{media.name}</span>
						<span className="remove-attachment">x</span>
					</div>
				) : null}

				<form onSubmit={sendMessage} className="message-control">
					<textarea value={value} onChange={onChange} placeholder="Type something...!" />
					<div className="file-input-container">
						<input
							type="file"
							onChange={(e) => {
								const file = e.target.files[0];
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onload = function () {
									// console.log(reader.result);
									setMedia({
										image: true,
										content: reader.result,
										name: file.name,
									});
								};
								reader.onerror = function (error) {
									console.log(error);
								};
							}}
							id="hidden-file"
						/>
						<label htmlFor="hidden-file">
							<img width="20" src={attachment} alt={""} />
						</label>
					</div>
					<button>
						<img src={sendIcon} alt={""} />
						<span style={{ display: "inline-block" }}>Send</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessagesControl;
