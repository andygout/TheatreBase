import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	App,
	AppendedEmployerCompany,
	AppendedCoEntities,
	InstanceFacet,
	InstanceLink,
	List,
	Materials,
	Productions
} from '../../components';

const Person = props => {

	const { documentTitle, pageTitle, person } = props;

	const {
		model,
		materials,
		subsequentVersionMaterials,
		sourcingMaterials,
		rightsGrantorMaterials,
		producerProductions,
		castMemberProductions,
		creativeProductions,
		crewProductions,
		awards
	} = person;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				materials?.length > 0 && (
					<InstanceFacet labelText='Materials'>

						<List instances={materials} />

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterials?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions of their materials'>

						<List instances={subsequentVersionMaterials} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as source material writer'>

						<List instances={sourcingMaterials} />

					</InstanceFacet>
				)
			}

			{
				rightsGrantorMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as rights grantor'>

						<List instances={rightsGrantorMaterials} />

					</InstanceFacet>
				)
			}

			{
				producerProductions?.length > 0 && (
					<InstanceFacet labelText='Productions as producer'>

						<List instances={producerProductions} />

					</InstanceFacet>
				)
			}

			{
				castMemberProductions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<List instances={castMemberProductions} />

					</InstanceFacet>
				)
			}

			{
				creativeProductions?.length > 0 && (
					<InstanceFacet labelText='Productions as creative team member'>

						<List instances={creativeProductions} />

					</InstanceFacet>
				)
			}

			{
				crewProductions?.length > 0 && (
					<InstanceFacet labelText='Productions as crew member'>

						<List instances={crewProductions} />

					</InstanceFacet>
				)
			}

			{
				awards?.length > 0 && (
					<InstanceFacet labelText='Awards'>

						{
							awards.map((award, index) =>
								<Fragment key={index}>
									<InstanceLink instance={award} />

									<ul className="list">

										{
											award.ceremonies.map((ceremony, index) =>
												<li key={index}>
													<InstanceLink instance={ceremony} />{': '}

													{
														ceremony.categories
															.map((category, index) =>
																<Fragment key={index}>
																	{ category.name }{': '}

																	{
																		category.nominations
																			.map((nomination, index) =>
																				<Fragment key={index}>
																					{
																						nomination.isWinner
																							? (<span>{'Winner'}</span>)
																							: (<span>{'Nomination'}</span>)
																					}

																					{
																						nomination.employerCompany && (
																							<AppendedEmployerCompany
																								employerCompany={nomination.employerCompany}
																							/>
																						)
																					}

																					{
																						nomination.coEntities.length > 0 && (
																							<AppendedCoEntities
																								coEntities={nomination.coEntities}
																							/>
																						)
																					}

																					{
																						nomination.productions.length > 0 && (
																							<Fragment>
																								<Fragment>{' for '}</Fragment>
																								<Productions
																									productions={nomination.productions}
																								/>
																							</Fragment>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						nomination.materials.length > 0 && (
																							<Fragment>{';'}</Fragment>
																						)
																					}

																					{
																						nomination.materials.length > 0 && (
																							<Fragment>
																								<Fragment>{' for '}</Fragment>
																								<Materials
																									materials={nomination.materials}
																								/>
																							</Fragment>
																						)
																					}
																				</Fragment>
																			)
																			.reduce((prev, curr) => [prev, ', ', curr])
																	}
																</Fragment>
															)
															.reduce((prev, curr) => [prev, '; ', curr])
													}
												</li>
											)
										}

									</ul>
								</Fragment>
							)
						}

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Person;
