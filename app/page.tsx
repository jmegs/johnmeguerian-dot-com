import Image from "next/image"
import AvatarImage from "./avatar.png"

export default function Home() {
	return (
		<div className="page-grid | p-8 h-screen uppercase text-center lg:text-left">
			<div id="uno" className="lg:mt-auto">
				<Image
					src={AvatarImage}
					alt="picture of john"
					loading="eager"
					className="mx-auto mb-4 lg:m-0 size-16 rounded-full border-4 border-wash"
				/>
			</div>
			<div id="dos">
				<h1>John Meguerian</h1>
			</div>
			<div id="tres">Design Manager</div>
			<div id="cuatro" className="mt-auto flex flex-col gap-4">
				<p>
					johnmeguerian
					<br />
					[at] gmail.com
				</p>
				<p>
					Brooklyn
					<br />
					New York
					<br />
					United States
				</p>
				<p>[ 40°40&apos;N, 73°59&apos;W ]</p>
			</div>
		</div>
	)
}
