<cfcomponent output="false">

	<cffunction name="get" access="remote" returntype="string" output="false" returnformat="plain">
		<cfargument name="targeturl" type="string" default="">
		<cfargument name="callback" type="string" default="">
		
		<cfset var result = "">
		
		<cfif len(url.targeturl)>
			<cfhttp url="#url.targeturl#" method="GET" />
			<cfset result = trim(cfhttp.fileContent)>
		</cfif>

		<!--- wrap --->
		<cfif structKeyExists(arguments, "callback")>
			<cfset result = arguments.callback & "(" & result & ")">
		</cfif>		

		<cfreturn result>
	</cffunction>
	

</cfcomponent>