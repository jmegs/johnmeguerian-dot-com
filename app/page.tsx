import Image from "next/image"
import AvatarImage from "./avatar.png"
import { BaffleText } from "./baffle-text"

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
				<h1>
					<BaffleText text="John Meguerian" delay={150} speed={32} />
				</h1>
			</div>
			<div id="tres">
				<BaffleText text="Design Manager" delay={450} speed={32} />
			</div>
			<div id="cuatro" className="mt-auto flex flex-col gap-4">
				<p>
					<BaffleText
						text={"johnmeguerian\n[at] gmail.com"}
						delay={800}
						speed={28}
					/>
				</p>
				<p>
					<BaffleText
						text={"Brooklyn\nNew York\nUnited States"}
						delay={1100}
						speed={28}
					/>
				</p>
				<p>
					<BaffleText
						text="[ 40°40'N, 73°59'W ]"
						delay={1400}
						speed={24}
					/>
				</p>
			</div>
		</div>
	)
}
